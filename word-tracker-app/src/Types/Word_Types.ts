export interface Word {
  id: string;
  word: string;
  language: string;
  meaning: string;
  exampleSentence: string;
  createdAt: string;
}

export interface PaginatedWords {
  words: Word[]; 
  total: number; 
}

export interface GetWordsResponse {
  getWords: PaginatedWords; 
}
