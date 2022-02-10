import { WordRequest } from '../types/appTypes';

export const sendGuess = async (word: string) => {
  const reqBody: WordRequest = {
    word: word.toLowerCase().split(''),
  };

  console.log('sending', word);

  await fetch('/api/getwordstatus', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  }).then(async (res) => {
    if (res.ok) {
      console.log(await res.json());
    }
  });
};
