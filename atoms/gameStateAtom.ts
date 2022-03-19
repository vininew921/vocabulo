import { atom } from 'recoil';
import { GameState } from '../types/appTypes';

export const gameStateContext = atom<GameState>({
  key: 'gameState',
  default: { activeWord: 0, words: ['', '', '', '', '', ''], wordString: '' },
});
