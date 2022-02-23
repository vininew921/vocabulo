import { WordRequest, WordResponse } from '../types/appTypes';

export const sendGuess = async (
  word: string
): Promise<WordResponse | undefined> => {
  const reqBody: WordRequest = {
    word: word.toLowerCase().split(''),
  };

  let response: WordResponse | undefined = undefined;

  await fetch('/api/getwordstatus', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  }).then(async (res) => {
    if (res.ok) {
      response = await res.json().then((ws) => ws as WordResponse);
    }
  });

  return response;
};

export const todaysWordResult = async () => {
  let word = '';
  let count = 0;
  await fetch('/api/gettodaysword', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  }).then(async (res) => {
    if (res.ok) {
      await res.json().then((w) => {
        (word = w.word), (count = w.count);
      });
    }
  });

  return [word, count.toString()];
};
