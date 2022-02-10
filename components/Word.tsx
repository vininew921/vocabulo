import { PositionStatus } from '../types/appTypes';
import WordChar from './WordChar';

type Word = {
  word: string;
};

const Word = ({ word }: Word) => {
  return (
    <div className='flex rounded-lg m-2 p-2 hover:cursor-default select-none'>
      {word.split('').map((c, i) => {
        return (
          <WordChar
            key={i}
            char={c}
            position={{ char: c, status: PositionStatus.NotChecked }}
          />
        );
      })}
    </div>
  );
};

export default Word;
