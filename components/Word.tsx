import { useEffect, useState } from 'react';
import { PositionStatus } from '../types/appTypes';
import WordChar from './WordChar';

type Word = {
  word: string;
};

const Word = ({ word }: Word) => {
  const [currentWord, setCurrentWord] = useState(word);

  useEffect(() => {
    let tempWord = word;
    while (tempWord.length < 5) {
      tempWord += ' ';
    }

    setCurrentWord(tempWord);
  }, [word]);

  return (
    <div>
      <div className='flex rounded-lg m-2 p-2 hover:cursor-default select-none'>
        {currentWord.split('').map((c, i) => {
          return (
            <WordChar
              key={i}
              char={c}
              position={{ char: c, status: PositionStatus.NotChecked }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Word;
