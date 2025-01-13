import React from "react";
import Loader from "../UIComponents/Loader";
import { AddWordFormProps } from "../Types/AddWordForm_Types";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="newWord">
          New Word
        </label>
        <input
          type="text"
          id="newWord"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter the new word"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="language">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Select a language</option>
          {languages.map((lang) => (
            <option key={lang.id} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="meaning">
          Meaning
        </label>
        <input
          type="text"
          id="meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter the meaning"
          required
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="sampleSentence"
        >
          Sample Sentence
        </label>
        <textarea
          id="sampleSentence"
          value={sampleSentence}
          onChange={(e) => setSampleSentence(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 resize-y draggable"
          placeholder="Enter a sample sentence"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded hover:bg-lavender-light"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save"}
      </button>
      {saving && <Loader />}
    </form>
  );
};

export default AddWordForm;
