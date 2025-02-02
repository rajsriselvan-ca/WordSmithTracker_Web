import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { message } from "antd";
import { notifyError } from "../Shared/Notification";
import { Word, GetWordsResponse } from "../Types/Word_Types";
import { GetLanguagesResponse } from "../Types/Language_Types";
import { GET_WORDS } from "../GraphQL/Queries/Words_Queries";
import { GET_LANGUAGES } from "../GraphQL/Queries/LanguageList_Queries";
import { EDIT_WORD, DELETE_WORD } from "../GraphQL/Mutations/Words_Mutations";

export const UseWordList = () => {
  const [userId, setUserId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formState, setFormState] = useState({
    id: "",
    userId: "",
    word: "",
    language: "",
    meaning: "",
    exampleSentence: "",
    createdAt: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const [loadWords, { data: wordData, loading: wordsLoading }] = useLazyQuery(GET_WORDS, {
    fetchPolicy: "cache-and-network", 
  });
  const [loadLanguages, { data: languageData, loading: languagesLoading }] =
  useLazyQuery<GetLanguagesResponse>(GET_LANGUAGES);
  const [editWord] = useMutation(EDIT_WORD);
  const [deleteWord] = useMutation(DELETE_WORD);
  const [pageSize] = useState(4);

  useEffect(() => {
    const initializeAndFetchWords = async () => {
      if (!userId) {
        const storedUser = localStorage.getItem("userDetails");
        if (!storedUser) {
          notifyError("Sorry!", "User details not found in local storage.");
          return;
        }

        const userDetails = JSON.parse(storedUser);
        if (!userDetails?.id) {
          notifyError("Sorry!", "User ID is missing in stored user details.");
          return;
        }

        setUserId(userDetails.id);
      }

      if (userId) {
        try {
          await Promise.all([
            fetchWords(userId, currentPage, pageSize),
            loadLanguages(),
          ]);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : "Failed to load data.";
          notifyError("Sorry!", `Failed to load data: ${errorMessage}`);
        }
      }
    };
    initializeAndFetchWords();
  }, [userId, currentPage, pageSize]);

  const handleEdit = (word: Word | null) => {
    if (!word || !userId) {
      message.error("Failed to edit the word. Word or User ID is missing. Please try again.");
      return;
    }

    setFormState({
      id: word.id,
      userId,
      word: word.word,
      language: word.language,
      meaning: word.meaning,
      exampleSentence: word.exampleSentence,
      createdAt: word.createdAt,
    });
    setIsModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!formState.id || !formState.word || !formState.language) {
      message.error("Please fill out all required fields before saving.");
      return;
    }

    const createdAt = new Date().toISOString();

    try {
      setSaving(true);
      await editWord({
        variables: {
          id: formState.id,
          userId,
          word: formState.word,
          language: formState.language,
          meaning: formState.meaning,
          exampleSentence: formState.exampleSentence,
          createdAt,
        },
        update: (cache) => {
          const existingWords = cache.readQuery<GetWordsResponse>({
            query: GET_WORDS,
            variables: { userId },
          });
          if (existingWords) {
            const updatedWords = existingWords.getWords.words.map((word) =>
              word.id === formState.id
                ? { ...formState, createdAt }
                : word
            );
            cache.writeQuery({
              query: GET_WORDS,
              variables: { userId },
              data: {
                getWords: {
                  words: updatedWords, 
                  total: existingWords.getWords.total, 
                },
              },
            });
          }
        },
      });
      message.success("Word updated successfully");
      setIsModalVisible(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update word.";
      notifyError("Sorry!", `Failed to update word: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const fetchWords = async (userId: string, page: number, limit: number) => {
    try {
      await loadWords({
        variables: { userId, page, limit },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load words.";
      notifyError("Sorry!", `Failed to load words: ${errorMessage}`);
    }
  };

  return {
    userId,
    wordData,
    languageData,
    wordsLoading,
    languagesLoading,
    isModalVisible,
    setIsModalVisible,
    formState,
    setFormState,
    saving,
    handleEdit,
    handleSaveEdit,
    deleteWord,
    loadWords,
    currentPage,
    setCurrentPage,
    pageSize,
    notifyError,
  };
};
