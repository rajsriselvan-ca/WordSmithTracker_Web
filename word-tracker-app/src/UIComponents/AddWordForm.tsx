import React from "react";
import Loader from "../UIComponents/Loader";
import { AddWordFormProps } from "../Types/AddWordForm_Types";
import InputField from "./InputField"; 

const AddWordForm: React.FC<AddWordFormProps> = ({
  newWord,
  setNewWord,
  language,
  setLanguage,
  meaning,
  setMeaning,
  sampleSentence,
  setSampleSentence,
  languages,
  saving,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md overflow-auto"
    >
      <InputField
        id="newWord"
        label="New Word"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        placeholder="Enter the new word"
        required
      />
      <InputField
        id="language"
        label="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        type="select"
        selectOptions={languages}
        placeholder="Select a language"
        required
      />
      <InputField
        id="meaning"
        label="Meaning"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        placeholder="Enter the meaning"
        required
      />
      <InputField
        id="sampleSentence"
        label="Sample Sentence"
        value={sampleSentence}
        onChange={(e) => setSampleSentence(e.target.value)}
        placeholder="Enter a sample sentence"
        required
        type="textarea"
      />
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded hover:bg-lavender-light w-full"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save"}
      </button>
      {saving && <Loader />}
    </form>
  );
};

export default AddWordForm;