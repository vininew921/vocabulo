import { collection, getDocs } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../firebase/firebaseClient';
import { FirebaseWord, FirebaseWordCount } from '../../types/appTypes';

const todaysWord = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET') {
    res.status(405).json('Invalid method');
    return;
  }

  let wordDoc: FirebaseWord;
  let wordCount: FirebaseWordCount;
  const docs = await getDocs(collection(firebase, 'words'));
  docs.docs.map((d) => {
    switch (d.id) {
      case 'wordOfTheDay':
        wordDoc = d.data() as FirebaseWord;
        break;

      case 'wordCount':
        wordCount = d.data() as FirebaseWordCount;

      default:
        break;
    }
  });

  res.status(200).json({ word: wordDoc!.word, count: wordCount!.count });
};

export default todaysWord;
