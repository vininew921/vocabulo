import { collection, getDocs } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../firebase/firebaseClient';
import { FirebaseWord } from '../../types/appTypes';

const todaysWord = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET') {
    res.status(405).json('Invalid method');
    return;
  }

  let wordDoc: FirebaseWord;
  const docs = await getDocs(collection(firebase, 'words'));
  docs.docs.map((d) => (wordDoc = d.data() as FirebaseWord));

  res.status(200).json({ word: wordDoc!.word });
};

export default todaysWord;
