export class WordStatus {
  static INVALID_WORD = 'Invalid Word';
  static MISSED_EVERYTHING = 'Missed everything';
  static PARTIALLY_CORRECT = 'Partially correct';
  static CORRECT = 'Correct';
}

export class PositionStatus {
  static NotChecked = 'Not checked';
  static Wrong = 'Wrong';
  static Misplaced = 'Misplaced';
  static Correct = 'Correct';
}

export class KeyCode {
  static ERASE = 'Backspace';
  static SUBMIT = 'Enter';
}

export class PositionColor {
  static NotChecked = '#111827';
  static Wrong = '#374151';
  static Misplaced = '#efedc7';
  static Correct = '#76dc93';
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

export type Char = {
  char: string | undefined;
  position: Position | undefined;
};
