import { atom } from 'recoil';

export const currentWordState = atom<string>({
  key: 'currentWordState',
  default: '',
});
