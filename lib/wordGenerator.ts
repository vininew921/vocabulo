import { randomInt } from 'crypto';
import { words } from '../utils/words';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import firebase from '../firebase/firebaseClient';
import { FirebaseWord } from '../types/appTypes';

export class WordGenerator {
  static wordOfTheDay = async (guess: string) => {
    let wordDoc: FirebaseWord;
    const docs = await getDocs(collection(firebase, 'words'));
    docs.docs.map((d) => (wordDoc = d.data() as FirebaseWord));

    if (new Date().getTime() > wordDoc!.expires.toDate().getTime()) {
      wordDoc!.word = words[randomInt(words.length)];
      let currentDoc = doc(collection(firebase, 'words'), 'wordOfTheDay');

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(3, 0, 0);

      updateDoc(currentDoc, {
        word: wordDoc!.word,
        expires: Timestamp.fromDate(tomorrow),
      });
    }

    await addDoc(collection(firebase, 'guesses'), {
      guess: guess,
      wordOfTheDay: wordDoc!.word,
      timestamp: Timestamp.now(),
    });

    return wordDoc!.word;
  };
}
