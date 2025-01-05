export interface Word {
  id: string;
  word: string;
  language: string;
  meaning: string;
  exampleSentence: string;
  createdAt: string;
}

export interface GetWordsResponse {
  getWords: Word[];
}
