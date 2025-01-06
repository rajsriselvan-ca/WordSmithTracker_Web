import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Table, message } from "antd";
import { notifyError } from "../Shared/Notification.ts";
import { Word, GetWordsResponse } from "../Types/Word_Types.ts";
import { GetLanguagesResponse } from "../Types/Language_Types.ts";
import { GET_WORDS } from "../GraphQL/Queries/Words_Queries.ts";
import { GET_LANGUAGES } from "../GraphQL/Queries/LanguageList_Queries.ts";
import { EDIT_WORD, DELETE_WORD } from "../GraphQL/Mutations/Words_Mutations.ts";
import { GetColumns } from "../MetaData/WordList_Column.tsx";
import Loader from "../UIComponents/Loader.tsx";
import EditWordModal from "../UIComponents/EditWordModal.tsx";
import DeleteConfirmationModal from "../UIComponents/DeleteConfirmationModal.tsx";

const WordList: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [deleteWord] = useMutation(DELETE_WORD);
  const [editWord] = useMutation(EDIT_WORD);
  const [loadWords, { data: wordData, loading: wordsLoading }] =
    useLazyQuery<GetWordsResponse, { userId: string }>(GET_WORDS);
  const [loadLanguages, { data: languageData, loading: languagesLoading }] =
    useLazyQuery<GetLanguagesResponse>(GET_LANGUAGES);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    userId: "",
    word: "",
    language: "",
    meaning: "",
    exampleSentence: "",
    createdAt: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
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

    loadWords({ variables: { userId: userDetails.id } }).catch((error) =>
      notifyError("Sorry!", `Failed to load words: ${error.message}`)
    );

    loadLanguages().catch((error) =>
      notifyError("Sorry!", `Failed to load languages: ${error.message}`)
    );
  }, [loadWords, loadLanguages]);

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
            cache.writeQuery({
              query: GET_WORDS,
              variables: { userId },
              data: {
                getWords: existingWords.getWords.map((word) =>
                  word.id === formState.id
                    ? { ...formState, createdAt }
                    : word
                ),
              },
            });
          }
        },
      });
      message.success("Word updated successfully");
      setIsModalVisible(false);
    } catch (error: any) {
      notifyError("Sorry!", `Failed to update word: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const columns = GetColumns(handleEdit, (id: string) => (
    <DeleteConfirmationModal
      id={id}
      userId={userId}
      deleteWord={deleteWord}
      cacheQuery={GET_WORDS}
      onSuccess={() => loadWords({ variables: { userId } })} // Reload words on success
      onError={(errorMessage) => notifyError("Sorry!", errorMessage)}
    />
  ));
  

  if (wordsLoading || languagesLoading) return <Loader />;

  return (
    <div>
      <h1 className="font-bold mb-4">List Of Words</h1>
      <Table dataSource={wordData?.getWords || []} columns={columns} rowKey="id" />
      <EditWordModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        formState={formState}
        setFormState={setFormState}
        languageData={languageData?.getLanguages}
        saving={saving}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default WordList;
