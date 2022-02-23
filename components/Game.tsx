import { useRecoilState } from 'recoil';
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Word from './Word';
import { gameStateContext } from '../atoms/gameStateAtom';
import {
  Position,
  PositionStatus,
  WordResponse,
  WordStatus,
} from '../types/appTypes';
import { sendGuess, todaysWordResult } from '../utils/requests';
import { setTimeout } from 'timers';
import copy from 'copy-to-clipboard';

const Game = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameState, setGameState] = useRecoilState(gameStateContext);
  const [words, setWords] = useState<string[]>([]);
  const [wordResponse, setWordResponse] = useState<WordResponse | null>(null);
  const [canSendRequest, setCanSendRequest] = useState(true);
  const [positions, setPositions] = useState<Position[][]>([]);
  const [finalWord, setFinalWord] = useState<string>('');
  const [gameEndedState, setGameEndedState] = useState(false);
  const [shareText, setShareText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setWords(gameState.words);
  }, [gameState.words]);

  useEffect(() => {
    const getFinalWord = async () => {
      let [fw, count] = await todaysWordResult();
      setFinalWord(fw);
      setWordCount(parseInt(count));
    };

    if (gameEnded()) {
      getFinalWord();
    }
  }, [positions]);

  useEffect(() => {
    if (gameEndedState) {
      let total = 0;
      let finalShareText = '';
      let emojiText = '';
      gameState.words.forEach((w, i) => {
        if (w.length == 5 && positions[i]) {
          total++;
          positions[i].forEach((p) => {
            switch (p.status) {
              case PositionStatus.Correct:
                emojiText += '🟩';
                break;

              case PositionStatus.Misplaced:
                emojiText += '🟨';
                break;

              case PositionStatus.Wrong:
                emojiText += '⬛';
                break;
            }
          });
        }

        emojiText += '\n';

        finalShareText = `Joguei vocabulo.me #${wordCount} - ${total}/5\n\n${emojiText}`;
      });

      setShareText(finalShareText);
    }
  }, [gameEndedState, wordCount]);

  useEffect(() => {
    if (
      wordResponse &&
      wordResponse.positions &&
      wordResponse.status != WordStatus.INVALID_WORD
    ) {
      const wordsCopy: string[] = [];
      let responseString = '';
      gameState.words.forEach((v) => wordsCopy.push(v));

      wordResponse.positions.forEach((v) => (responseString += v.char));
      wordsCopy[gameState.activeWord] = responseString;

      const newPositions: Position[][] = [];
      positions.forEach((p) => newPositions.push(p));

      newPositions.push(wordResponse.positions);

      setPositions(newPositions);

      const activeWordIndex = Math.min(gameState.activeWord + 1, 5);

      setGameState({
        ...gameState,
        wordString: '',
        activeWord: activeWordIndex,
        words: wordsCopy,
      });

      if (inputRef.current) {
        inputRef.current.value = '';
        if (activeWordIndex == 5) {
          inputRef.current.disabled = true;
          setCanSendRequest(false);
        }
      }
    }
  }, [wordResponse]);

  const gameEnded = (): boolean => {
    if (
      positions[4]?.length == 5 &&
      positions?.[4]?.[5]?.status != PositionStatus.NotChecked
    ) {
      setGameEndedState(true);
      return true;
    }

    let index = gameState.activeWord - 1;
    if (positions[index]) {
      for (let i = 0; i < positions[index].length; i++) {
        if (positions[index][i].status != PositionStatus.Correct) {
          return false;
        }
      }

      setGameState({ ...gameState, activeWord: 7 });
      setGameEndedState(true);
      return true;
    }

    return false;
  };

  const copyToClipboard = () => {
    if (gameEndedState) {
      copy(shareText, { message: 'Copiado para a área de transferência' });
      alert('Resultado copiado para àrea de transferência (ctrl + v)');
    }
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.focus();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 5 && !gameEndedState) {
      const wordsCopy: string[] = [];
      gameState.words.forEach((v) => wordsCopy.push(v));

      wordsCopy[gameState.activeWord] = e.currentTarget.value;
      setGameState({
        ...gameState,
        words: wordsCopy,
        wordString: e.currentTarget.value,
      });
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    await submit(e.code, e.keyCode);
  };

  const submit = async (code: string, keyCode: number = 0) => {
    if (canSendRequest) {
      if (
        gameState.wordString.length == 5 &&
        (code == 'Enter' || keyCode == 13)
      ) {
        setCanSendRequest(false);
        setTimeout(() => {
          setCanSendRequest(true);
        }, 500);
        const response = await sendGuess(gameState.wordString);
        if (response) {
          setWordResponse(response);
        }
      }
    }
  };

  return (
    <div>
      {words.map((w, i) => {
        return (
          <Word
            key={i}
            word={w}
            positions={positions?.[i]}
            relativePosition={i}
            invalidWord={wordResponse?.status == WordStatus.INVALID_WORD}
          />
        );
      })}
      <input
        ref={inputRef}
        className='absolute h-1 w-1 opacity-0 hover:cursor-default'
        maxLength={5}
        onBlur={handleInputFocus}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className='flex w-full justify-center'>
        {finalWord != '' ? (
          <div className='flex flex-col md:flex-row'>
            <button
              className={`text-center text-2xl lg:text-2xl md:text-2xl text-white outline-orange-600
        font-bold h-10 w-56 rounded-2xl outline outline-4 select-text cursor-default`}
            >
              Palavra: {finalWord.toUpperCase()}
            </button>
            <button
              className={`text-center m-5 md:m-0 md:ml-5 text-2xl lg:text-2xl md:text-2xl text-white outline-orange-600  hover:outline-8
        font-bold h-10 w-48 rounded-2xl ml-4 outline outline-4`}
              onClick={() => copyToClipboard()}
            >
              Compartilhar
            </button>
          </div>
        ) : (
          <button
            className={`text-center text-2xl lg:text-2xl md:text-2xl text-white outline-orange-600  hover:outline-8
        font-bold h-12 w-40 rounded-2xl outline outline-4 ${
          gameState.wordString.length != 5 ? 'opacity-40' : ''
        }`}
            type='submit'
            onClick={() => submit('Enter')}
          >
            Enviar
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
