import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { gameStateContext } from '../atoms/gameStateAtom';
import { Char, PositionColor, PositionStatus } from '../types/appTypes';

const WordChar = ({
  char,
  position,
  relativePosition,
  parentWordPosition,
  invalidWordParent,
}: Char) => {
  let color = PositionColor.NotChecked;
  const [gameState] = useRecoilState(gameStateContext);
  const underscoreRef = useRef<HTMLParagraphElement>(null);

  if (position) {
    switch (position.status) {
      case PositionStatus.Correct:
        color = PositionColor.Correct;
        break;

      case PositionStatus.Misplaced:
        color = PositionColor.Misplaced;
        break;

      case PositionStatus.Wrong:
        color = PositionColor.Wrong;
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (underscoreRef.current) {
      if (
        relativePosition == gameState.wordString.length &&
        parentWordPosition == gameState.activeWord
      ) {
        setTimeout(() => {
          underscoreRef.current!.className = '';
        }, 10);
      } else {
        underscoreRef.current!.className = 'hidden';
      }
    }
  }, [gameState.wordString]);

  return (
    <div
      className={` bg-gray text-center content-center p-2 ${
        invalidWordParent && parentWordPosition == gameState.activeWord
          ? 'text-red-500'
          : 'text-white'
      }`}
    >
      <p
        className={`char md:mdChar lg:lgChar  ${
          invalidWordParent && parentWordPosition == gameState.activeWord
            ? 'outline-red-600'
            : 'outline-black'
        }`}
        style={{ backgroundColor: color }}
      >
        {char?.toUpperCase()}
        <p ref={underscoreRef} className={'hidden'}>
          _
        </p>
      </p>
    </div>
  );
};

export default WordChar;
