import React from "react";
import Loader from "../UIComponents/Loader";
import AddWordForm from "../UIComponents/AddWordForm";
import { UseAddWord } from "../CustomHooks/UseAddWord";

const AddWord: React.FC = () => {
  const {
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
    languagesLoading,
    handleSubmit,
  } = UseAddWord();

  if (languagesLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-theme">Add New Word</h1>
      <AddWordForm
        newWord={newWord}
        setNewWord={setNewWord}
        language={language}
        setLanguage={setLanguage}
        meaning={meaning}
        setMeaning={setMeaning}
        sampleSentence={sampleSentence}
        setSampleSentence={setSampleSentence}
        languages={languages}
        saving={saving}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddWord;
