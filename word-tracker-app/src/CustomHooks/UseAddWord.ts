import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { message } from "antd";
import { notifyError } from "../Shared/Notification";
import { GET_LANGUAGES } from "../GraphQL/Queries/LanguageList_Queries";
import { GET_WORDS } from "../GraphQL/Queries/Words_Queries";
import { ADD_WORD } from "../GraphQL/Mutations/Words_Mutations";
import { useAuth } from "../Context/AuthContext";
import { GetWordsResponse } from "../Types/GetWordResponse_Types";

export const UseAddWord = () => {
  const { userDetails } = useAuth();
  const [newWord, setNewWord] = useState("");
  const [language, setLanguage] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sampleSentence, setSampleSentence] = useState("");
  const [saving, setSaving] = useState(false);
  const [languages, setLanguages] = useState<{ id: string; name: string }[]>([]);
  const [pageSize] = useState(4);

  const [loadLanguages, { loading: languagesLoading }] = useLazyQuery(GET_LANGUAGES);

  const [addWord] = useMutation(ADD_WORD, {
    update(cache, { data: { addWord } }) {
      const query = GET_WORDS;
      const storedUser = userDetails;
      const { id } = storedUser || {};
      const existingData = cache.readQuery<GetWordsResponse>({
        query,
        variables: { userId: id, page: 1, limit: pageSize },
      });

      if (!existingData || !existingData.getWords) return;
      const { words, total } = existingData.getWords;
      const updatedWords = [addWord, ...words].slice(0, pageSize);
      cache.writeQuery<GetWordsResponse>({
        query,
        variables: { userId: id, page: 1, limit: pageSize },
        data: {
          getWords: {
            words: updatedWords,
            total: total + 1,
          },
        },
      });
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
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occured. Please try again."
        notifyError("Sorry!", errorMessage);
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
      const { id } = storedUser || {};

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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occured. Please try again."
      notifyError("Sorry!", errorMessage);
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
