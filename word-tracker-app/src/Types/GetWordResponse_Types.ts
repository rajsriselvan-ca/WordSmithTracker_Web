export interface GetWordsResponse {
  getWords: {
    words: Array<{
      id: string;
      word: string;
      language: string;
      meaning: string;
      exampleSentence: string;
      createdAt: string;
    }>;
    total: number;
  };
}