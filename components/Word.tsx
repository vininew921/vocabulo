import { PositionStatus } from '../types/wordleTypes';
import WordChar from './WordChar';

type Word = {
  word: string;
};

const Word = ({ word }: Word) => {
  return (
    <div className='flex rounded-lg m-2 p-2'>
      {word.split('').map((c, i) => {
        return (
          <WordChar
            key={i}
            char={undefined}
            last={i == 4 ? true : false}
            position={{ char: 'a', status: PositionStatus.NotChecked }}
          />
        );
      })}
    </div>
  );
};

export default Word;
