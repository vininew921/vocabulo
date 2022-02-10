import { useRecoilState } from 'recoil';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import Word from './Word';
import { gameStateContext } from '../atoms/gameStateAtom';

const Game = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameState, setGameState] = useRecoilState(gameStateContext);
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setWords(gameState.words);
  }, [gameState.words]);

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.focus();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const wordsCopy: string[] = [];
    gameState.words.forEach((v) => wordsCopy.push(v));

    wordsCopy[gameState.activeWord] = e.currentTarget.value;
    setGameState({ ...gameState, words: wordsCopy });
  };

  return (
    <div>
      {words.map((w, i) => {
        return <Word key={i} word={w} />;
      })}
      <input
        ref={inputRef}
        className='absolute opacity-0 hover:cursor-default'
        maxLength={5}
        onBlur={handleInputFocus}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Game;
