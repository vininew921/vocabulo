import { useEffect, useState } from 'react';
import { Position, PositionStatus } from '../types/appTypes';
import WordChar from './WordChar';

type Word = {
  word: string;
  positions: Position[] | undefined;
};

const Word = ({ word, positions }: Word) => {
  const [currentWord, setCurrentWord] = useState(word);
  const [currentPositions, setCurrentPositions] = useState(positions);

  useEffect(() => {
    let tempWord = word;
    while (tempWord.length < 5) {
      tempWord += ' ';
    }

    setCurrentWord(tempWord);
  }, [word, positions]);

  useEffect(() => {
    setCurrentPositions(positions);
  }, [positions]);

  return (
    <div>
      <div className='flex rounded-lg m-2 p-2 hover:cursor-default select-none'>
        {currentWord.split('').map((c, i) => {
          return (
            <WordChar
              key={i}
              char={c}
              position={{
                char: c,
                status:
                  currentPositions?.[i]?.status ?? PositionStatus.NotChecked,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Word;
