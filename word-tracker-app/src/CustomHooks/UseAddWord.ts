import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { message } from "antd";
import { notifyError } from "../Shared/Notification.ts";
import { GetWordsResponse } from "../Types/Word_Types.ts";
import { GET_LANGUAGES } from "../GraphQL/Queries/LanguageList_Queries.ts";
import { GET_WORDS } from "../GraphQL/Queries/Words_Queries.ts";
import { ADD_WORD } from "../GraphQL/Mutations/Words_Mutations.ts";
import {useAuth} from "../Context/AuthContext.tsx";

export const UseAddWord = () => {
  const {userDetails} = useAuth();
  const [newWord, setNewWord] = useState("");
  const [language, setLanguage] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sampleSentence, setSampleSentence] = useState("");
  const [saving, setSaving] = useState(false);
  const [languages, setLanguages] = useState<{ id: string; name: string }[]>([]);

  const [loadLanguages, { loading: languagesLoading }] = useLazyQuery(GET_LANGUAGES);

  const [addWord] = useMutation(ADD_WORD, {
    update(cache, { data: { addWord } }) {
      const storedUser = userDetails;
      const { id } = storedUser ? storedUser : {};
      const existingWords = cache.readQuery<GetWordsResponse>({
        query: GET_WORDS,
        variables: { userId: id },
      });
  
      if (existingWords) {
        cache.writeQuery({
          query: GET_WORDS,
          variables: { userId: id },
          data: {
            getWords: [...existingWords.getWords, addWord],
          },
        });
      }
    },
  });

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await loadLanguages();
        if (data?.getLanguages) {
          setLanguages(data.getLanguages);
        } else {
          notifyError("Sorry!", "Failed to fetch language list.");
        }
      } catch (error: any) {
        const errorMessage = error?.message || "An unexpected error occurred.";
        notifyError("Sorry!", `Error while fetching languages: ${errorMessage}`);
      }
    };

    fetchLanguages();
  }, [loadLanguages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);
      const createdAt = new Date().toISOString();
      const exampleSentence = sampleSentence;
      const storedUser = userDetails;
      const { id } = storedUser ? storedUser : null;

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

      message.success("Word added successfully.");
      setNewWord("");
      setLanguage("");
      setMeaning("");
      setSampleSentence("");
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      notifyError("Sorry!", `Failed to add word. Please try again: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  return {
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
  };
};
