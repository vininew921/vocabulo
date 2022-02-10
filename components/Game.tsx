import { useRecoilState } from 'recoil';
import { currentWordState } from '../atoms/wordAtom';
import Word from './Word';

const Game = () => {
  const [currentWord, setCurrentWord] = useRecoilState(currentWordState);

  return (
    <div>
      <Word word='Teste' />
      <Word word='Navio' />
      <Word word='Carro' />
      <Word word='Oloco' />
      <Word word='Salve' />
    </div>
  );
};

export default Game;
