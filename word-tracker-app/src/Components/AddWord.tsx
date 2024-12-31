import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { notifySuccess, notifyError } from "../Shared/Notification.ts";

const GET_LANGUAGES = gql`
  query GetLanguages {
    getLanguages {
      id
      name
    }
  }
`;

const ADD_WORD = gql`
  mutation AddWord(
    $userId: String!
    $word: String!
    $language: String!
    $meaning: String!
    $exampleSentence: String!
    $createdAt: String!
  ) {
    addWord(
      userId: $userId
      word: $word
      language: $language
      meaning: $meaning
      exampleSentence: $exampleSentence
      createdAt: $createdAt
    ) {
      id
      word
      language
      meaning
      exampleSentence
      createdAt
    }
  }
`;

const AddWord: React.FC = () => {
  const [newWord, setNewWord] = useState("");
  const [language, setLanguage] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sampleSentence, setSampleSentence] = useState("");
  const [saving, setSaving] = useState(false);

  const { data, loading, error } = useQuery(GET_LANGUAGES);

  const [addWord] = useMutation(ADD_WORD);

  if (loading) return <p>Loading languages...</p>;
  if (error) return <p>Error loading languages: {error.message}</p>;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newWord || !language || !meaning) {
      alert("Please fill out all required fields!");
      return;
    }

    try {
      setSaving(true); 
      const createdAt = new Date().toISOString();
      const exampleSentence = sampleSentence || ""; 
      const storedUser = localStorage.getItem("userDetails");
      const { id } = storedUser ? JSON.parse(storedUser) : null;

      await addWord({
        variables: {
          userId: id,
          word: newWord,
          language,
          meaning,
          exampleSentence,
          createdAt,
        },
      });

      notifySuccess("Word Saved!", "Word added successfully.");
      setNewWord("");
      setLanguage("");
      setMeaning("");
      setSampleSentence("");
    } catch (error) {
      console.log("Error adding word:", error);
      notifyError("Sorry!", `${error.message}`);
    } finally {
      setSaving(false); 
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Word</h1>
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
            {data.getLanguages.map((lang: { id: string; name: string }) => (
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
          <label className="block text-sm font-medium mb-1" htmlFor="sampleSentence">
            Sample Sentence (Optional)
          </label>
          <textarea
            id="sampleSentence"
            value={sampleSentence}
            onChange={(e) => setSampleSentence(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-y draggable"
            placeholder="Enter a sample sentence"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={saving} 
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {saving && (
          <div className="flex justify-center mt-4">
            <div className="loader w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddWord;

