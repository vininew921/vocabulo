import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CharCount,
  Position,
  PositionStatus,
  TodaysWord,
  WordRequest,
  WordResponse,
  WordStatus,
} from '../../types/appTypes';
import { words } from '../../utils/words';
import { utf8ToASCII, validWord } from '../../utils/wordsUtil';
import { WordGenerator } from '../../lib/wordGenerator';

interface ApiRequest extends NextApiRequest {
  body: WordRequest;
}

const getTodaysWord = (): TodaysWord => {
  const word = words[WordGenerator.getRandomValue()].split('');
  const chars: CharCount[] = [];
  word.forEach((w) => {
    let found = false;
    chars.forEach((cc) => {
      if (cc.char == utf8ToASCII(w)) {
        cc.count++;
        found = true;
      }
    });

    if (!found) {
      chars.push({ char: w, count: 1 });
    }
  });

  let wordToAscii = '';
  word.forEach((w) => {
    wordToAscii += utf8ToASCII(w);
  });

  const todaysWord: TodaysWord = {
    word: word,
    chars: chars,
    asciiWord: wordToAscii,
  };

  return todaysWord;
};

const getWordResponse = (req: WordRequest): WordResponse => {
  const currentWord = req;
  currentWord.word = validWord(currentWord);

  if (!currentWord.word) {
    return {
      status: WordStatus.INVALID_WORD,
      positions: undefined,
    };
  }

  let currentStatus = WordStatus.CORRECT;
  const positionsResponse: Position[] = [];
  const todaysWord = getTodaysWord();
  let foundSomething = false;

  for (let i = 0; i < todaysWord.word.length; i++) {
    let currentPosition = PositionStatus.Wrong;
    let currentChar = currentWord.word[i];

    if (todaysWord.asciiWord.includes(currentChar)) {
      currentPosition = PositionStatus.Wrong;
      for (
        let charIndex = 0;
        charIndex < todaysWord.chars.length;
        charIndex++
      ) {
        if (
          utf8ToASCII(todaysWord.chars[charIndex].char) ==
            utf8ToASCII(currentChar) &&
          todaysWord.chars[charIndex].count > 0
        ) {
          currentChar = todaysWord.chars[charIndex].char;
          todaysWord.chars[charIndex].count--;
          currentPosition = PositionStatus.Misplaced;
          foundSomething = true;
        }
      }
    }

    if (utf8ToASCII(todaysWord.word[i]) == utf8ToASCII(currentChar)) {
      currentChar = todaysWord.word[i];
      foundSomething = true;
      if (currentPosition != PositionStatus.Misplaced) {
        for (let pr = 0; pr < positionsResponse.length; pr++) {
          if (
            positionsResponse[pr].char == currentChar &&
            positionsResponse[pr].status == PositionStatus.Misplaced
          ) {
            positionsResponse[pr].status = PositionStatus.Wrong;
            break;
          }
        }
      }
      currentPosition = PositionStatus.Correct;
    }

    positionsResponse.push({ char: currentChar, status: currentPosition });
    if (currentPosition != PositionStatus.Correct) {
      currentStatus = foundSomething
        ? WordStatus.PARTIALLY_CORRECT
        : WordStatus.MISSED_EVERYTHING;
    }
  }

  return { status: currentStatus, positions: positionsResponse };
};

const WordResult = (
  req: ApiRequest,
  res: NextApiResponse<WordResponse | string>
) => {
  if (req.method == 'POST') {
    res.status(200).json(getWordResponse(req.body));
  } else {
    res.status(405).json('Invalid method');
  }
};

export default WordResult;
