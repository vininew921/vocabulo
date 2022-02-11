import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { gameStateContext } from '../atoms/gameStateAtom';
import { Position, PositionStatus } from '../types/appTypes';
import WordChar from './WordChar';

type Word = {
  word: string;
  positions: Position[] | undefined;
  relativePosition: number;
  invalidWord: boolean;
};

const Word = ({ word, positions, relativePosition, invalidWord }: Word) => {
  const [currentWord, setCurrentWord] = useState(word);
  const [currentPositions, setCurrentPositions] = useState(positions);
  const [gameState] = useRecoilState(gameStateContext);

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
      <div
        className={`flex rounded-xl m-2 p-2 hover:cursor-default select-none ${
          relativePosition != gameState.activeWord && !positions
            ? 'opacity-40'
            : ''
        } `}
      >
        {currentWord.split('').map((c, i) => {
          return (
            <WordChar
              key={i}
              char={c}
              relativePosition={i}
              parentWordPosition={relativePosition}
              invalidWordParent={invalidWord}
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
