import React from 'react';
import { useRecoilState } from 'recoil';
import { currentWordState } from '../atoms/wordAtom';
import {
  Char,
  KeyCode,
  PositionColor,
  PositionStatus,
} from '../types/appTypes';
import { sendGuess } from '../utils/requests';

const WordChar = ({ char, last, position }: Char) => {
  const [currentWord, setCurrentWord] = useRecoilState(currentWordState);
  let currentKey = '';

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
      <input
        className='w-24 h-24 rounded-2xl text-center font-bold text-7xl outline outline-4
        outline-orange-600 hover:outline-8'
        style={{ backgroundColor: color }}
        maxLength={1}
        defaultValue={char}
        onKeyDown={(e) => {
          switch (e.key) {
            case KeyCode.ERASE:
              currentKey = KeyCode.ERASE;
              break;

            case KeyCode.SUBMIT:
              if (last) sendGuess(currentWord);
              break;

            default:
              currentKey = e.key;
          }
        }}
        onChange={(e) => {
          let newWord = '';

          if (currentKey == KeyCode.ERASE) {
            newWord = currentWord.length > 0 ? currentWord.slice(0, -1) : '';
          } else {
            e.target.value = e.target.value.toUpperCase();
            newWord = currentWord + e.target.value;
          }

          setCurrentWord(newWord);
        }}
      />
    </div>
  );
};

export default WordChar;
