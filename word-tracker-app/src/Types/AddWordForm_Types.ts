import React from "react"

export interface AddWordFormProps {
  newWord: string;
  setNewWord: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  meaning: string;
  setMeaning: (value: string) => void;
  sampleSentence: string;
  setSampleSentence: (value: string) => void;
  languages: { id: string; name: string }[];
  saving: boolean;
  handleSubmit: (event: React.FormEvent) => void;
}