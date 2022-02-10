import { WordRequest } from '../types/appTypes';
import { words, wordsAscii } from './words';

const asciiTable = [
  ['a', ['ã', 'Ã', 'â', 'Â', 'á', 'Á', 'à', 'À']],
  ['e', ['ê', 'Ê', 'é', 'É', 'è', 'È']],
  ['i', ['î', 'Î', 'í', 'Í', 'ì', 'Ì']],
  ['o', ['õ', 'Õ', 'ô', 'Ô', 'ó', 'Ó', 'ò', 'Ò']],
  ['u', ['û', 'Û', 'ú', 'Ú', 'ù', 'Ù']],
];

export const validWord = (word: WordRequest): string[] | undefined => {
  let wordString = word?.word?.join('');

  if (wordString?.length != 5) {
    return undefined;
  }

  if (words.includes(wordString)) {
    return wordString.split('');
  }

  if (!wordsAscii.includes(wordString)) {
    return undefined;
  }

  for (let i = 0; i < wordsAscii.length; i++) {
    if (wordsAscii[i] == wordString) {
      return words[i].split('');
    }
  }
};

export const utf8ToASCII = (char: string): string => {
  let result = char;
  asciiTable.forEach((v) => {
    if (v[1].includes(char)) {
      result = v[0][0];
    }
  });

  return result;
};
