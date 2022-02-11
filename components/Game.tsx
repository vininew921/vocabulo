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

const Game = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameState, setGameState] = useRecoilState(gameStateContext);
  const [words, setWords] = useState<string[]>([]);
  const [wordResponse, setWordResponse] = useState<WordResponse | null>(null);
  const [canSendRequest, setCanSendRequest] = useState(true);
  const [positions, setPositions] = useState<Position[][]>([]);
  const [finalWord, setFinalWord] = useState<string>('');

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
      let fw = await todaysWordResult();
      console.log(fw);
      setFinalWord(fw);
    };

    if (
      positions[4]?.length == 5 &&
      positions?.[4]?.[5]?.status != PositionStatus.NotChecked
    ) {
      getFinalWord();
    }
  }, [positions]);

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

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.focus();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 5) {
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
          <button
            className={`text-center text-2xl lg:text-2xl md:text-2xl text-white outline-orange-600  hover:outline-8
        font-bold h-12 w-64 rounded-2xl outline outline-4`}
          >
            Palavra: {finalWord.toUpperCase()}
          </button>
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
