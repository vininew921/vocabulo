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
import { Position, WordResponse, WordStatus } from '../types/appTypes';
import { sendGuess } from '../utils/requests';
import { setTimeout } from 'timers';

const Game = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameState, setGameState] = useRecoilState(gameStateContext);
  const [words, setWords] = useState<string[]>([]);
  const [wordResponse, setWordResponse] = useState<WordResponse | null>(null);
  const [canSendRequest, setCanSendRequest] = useState(true);
  const [positions, setPositions] = useState<Position[][]>([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setWords(gameState.words);
  }, [gameState.words]);

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
    const wordsCopy: string[] = [];
    gameState.words.forEach((v) => wordsCopy.push(v));

    wordsCopy[gameState.activeWord] = e.currentTarget.value;
    setGameState({
      ...gameState,
      words: wordsCopy,
      wordString: e.currentTarget.value,
    });
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (canSendRequest) {
      if (gameState.wordString.length == 5 && e.code == 'Enter') {
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
        return <Word key={i} word={w} positions={positions?.[i]} />;
      })}
      <input
        ref={inputRef}
        className='absolute opacity-0 hover:cursor-default'
        maxLength={5}
        onBlur={handleInputFocus}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Game;
