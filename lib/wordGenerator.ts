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
import { FirebaseWord, FirebaseWordCount } from '../types/appTypes';

export class WordGenerator {
  static wordOfTheDay = async (guess: string) => {
    let wordDoc: FirebaseWord | null;
    let wordCount: FirebaseWordCount | null;

    const wordDocs = await getDocs(collection(firebase, 'words'));

    wordDocs.docs.map((d) => {
      switch (d.id) {
        case 'wordOfTheDay':
          wordDoc = d.data() as FirebaseWord;
          break;

        case 'wordCount':
          wordCount = d.data() as FirebaseWordCount;
          break;

        default:
          break;
      }
    });

    if (new Date().getTime() > wordDoc!.expires.toDate().getTime()) {
      wordDoc!.word = words[randomInt(words.length)];
      wordCount!.count = wordCount!.count + 1;

      let currentWordDoc = doc(collection(firebase, 'words'), 'wordOfTheDay');
      let currentWordCountDoc = doc(collection(firebase, 'words'), 'wordCount');

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(3, 0, 0);

      updateDoc(currentWordDoc, {
        word: wordDoc!.word,
        expires: Timestamp.fromDate(tomorrow),
      });

      updateDoc(currentWordCountDoc, {
        count: wordCount!.count,
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
