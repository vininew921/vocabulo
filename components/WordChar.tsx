import React from 'react';
import { Char, PositionColor, PositionStatus } from '../types/appTypes';

const WordChar = ({ char, position }: Char) => {
  let color = PositionColor.NotChecked;

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

  return (
    <div className='text-orange-600 bg-gray text- p-2'>
      <p
        className='char md:mdChar lg:lgChar'
        style={{ backgroundColor: color }}
      >
        {char?.toUpperCase()}
      </p>
    </div>
  );
};

export default WordChar;
