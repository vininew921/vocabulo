export class WordStatus {
  static INVALID_WORD = 'Invalid Word';
  static PARTIALLY_CORRECT = 'Partially correct';
  static CORRECT = 'Correct';
}

export class PositionStatus {
  static Wrong = 'Wrong';
  static Misplaced = 'Misplaced';
  static Correct = 'Correct';
}

export type Position = {
  char: string;
  status: PositionStatus;
};

export type CharCount = {
  char: string;
  count: number;
};

export type TodaysWord = {
  word: string[];
  asciiWord: string;
  chars: CharCount[];
};

export type WordRequest = {
  word: string[] | undefined;
};

export type WordResponse = {
  status: WordStatus;
  positions: Position[] | undefined;
};
