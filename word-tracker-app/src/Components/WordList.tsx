import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation} from "@apollo/client";
import { Table, Button, Modal, Input, Select, Space, message } from "antd";
import { notifyError } from "../Shared/Notification.ts";
import {Word, GetWordsResponse} from "../Types/Word_Types.ts"
import {GetLanguagesResponse} from "../Types/Language_Types.ts";
import {GET_WORDS} from "../GraphQL/Queries/Words_Queries.ts";
import {GET_LANGUAGES} from "../GraphQL/Queries/LanguageList_Queries.ts";
import {EDIT_WORD, DELETE_WORD} from "../GraphQL/Mutations/Words_Mutations.ts";

const { TextArea } = Input;
const { Option } = Select;

const WordList: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [deleteWord] = useMutation(DELETE_WORD);
  const [editWord] = useMutation(EDIT_WORD);
  const [loadWords, { data: wordData }] =
    useLazyQuery<GetWordsResponse, { userId: string }>(GET_WORDS);
  const [loadLanguages, { data: languageData }] =
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
    try {
      const storedUser = localStorage.getItem("userDetails");
      if (!storedUser) {
        notifyError("Sorry!","User details not found in local storage.")
        return;
      }
  
      const userDetails = JSON.parse(storedUser);
      if (!userDetails?.id) {
        notifyError("Sorry!","User ID is missing in stored user details.")
        return;
      }
      setUserId(userDetails.id);
      loadWords({
        variables: { userId: userDetails.id },
      }).catch((error: any) => {
        const errorMessage = error?.message || "An unexpected error occurred.";
        notifyError("Sorry!", `Failed to load words. Please try again: ${errorMessage}`);
      });
      loadLanguages().catch((error: any) => {
        const errorMessage = error?.message || "An unexpected error occurred.";
        notifyError("Sorry!", `Failed to load lanuages. Please try again: ${errorMessage}`);
      });
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      notifyError("Sorry!", `Initialization error: ${errorMessage}`);
    }
  }, [loadWords, loadLanguages]);
  

  const handleDelete = async (id: string) => {
    if (!userId) {
      message.error("User ID is missing. Please try again.");
      return;
    }
  
    Modal.confirm({
      title: "Are you sure you want to delete this word?",
      onOk: async () => {
        try {
          await deleteWord({
            variables: { id },
            update: (cache) => {
              try {
                const existingWords = cache.readQuery<GetWordsResponse>({
                  query: GET_WORDS,
                  variables: { userId },
                });
                if (existingWords) {
                  cache.writeQuery({
                    query: GET_WORDS,
                    variables: { userId },
                    data: {
                      getWords: existingWords.getWords.filter(
                        (word) => word.id !== id
                      ),
                    },
                  });
                }
              } catch (updateError : any) {
                const errorMessage = updateError?.message || "An unexpected error occurred.";
                notifyError("Sorry!", `Failed to update the cache after deletion. Please try again: ${errorMessage}`);
              }
            },
          });
          message.success("Word deleted successfully");
        } catch (error: any) {
          const errorMessage = error?.message || "An unexpected error occurred.";
          notifyError("Sorry!", `Failed to delete record. Please try again: ${errorMessage}`);
        }
      },
    });
  };
  

  const handleEdit = (word: Word | null) => {
    if (!word || !userId) {
      message.error("Failed to edit the word. Word or User ID is missing. Please try again.");
      return;
    }
  
    try {
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
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      notifyError("Sorry!", `Failed to set values in form. Please try again: ${errorMessage}`);
    } 
  };
  

  const handleSaveEdit = async () => {
    if (!formState.id || !formState.word || !formState.language) {
      message.error("Please fill out all required fields before saving.");
      return;
    }
  
    const createdAt = new Date().toISOString();
  
    try {
      setSaving(true)
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
          try {
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
          } catch (cacheError: any) {
            const errorMessage = cacheError?.message || "An unexpected error occurred.";
            notifyError("Sorry!", `Cache update error. Please try again: ${errorMessage}`);
            message.warning("Changes saved, but the list might not refresh immediately.");
          } finally {
            setSaving(false)
          }
        },
      });
      message.success("Word updated successfully");
      setIsModalVisible(false);
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      notifyError("Sorry!", `Failed to update word. Please try again: ${errorMessage}`);
    }
  };
  

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Meaning",
      dataIndex: "meaning",
      key: "meaning",
    },
    {
      title: "Example Sentence",
      dataIndex: "exampleSentence",
      key: "exampleSentence",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: Word) => (
        <Space size="middle">
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-lavender-light"
            onClick={() => handleEdit(record)}
          >
            Edit
          </button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-bold mb-4">List Of Words</h1>
      <Table dataSource={wordData?.getWords || []} columns={columns} rowKey="id" />
      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Edit Word</label>
          <Input
            placeholder="Word"
            value={formState.word}
            onChange={(e) => setFormState({ ...formState, word: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Language</label>
          <Select
            placeholder="Select Language"
            value={formState.language}
            onChange={(value) => setFormState({ ...formState, language: value })}
            className="w-full"
          >
            {languageData?.getLanguages.map((lang) => (
              <Option key={lang.id} value={lang.name}>
                {lang.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Meaning</label>
          <Input
            placeholder="Meaning"
            value={formState.meaning}
            onChange={(e) => setFormState({ ...formState, meaning: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Example Sentence</label>
          <TextArea
            placeholder="Enter example sentence"
            value={formState.exampleSentence}
            onChange={(e) =>
              setFormState({ ...formState, exampleSentence: e.target.value })
            }
            rows={4}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-lavender-light mr-2"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => setIsModalVisible(false)}
          >
            Cancel
          </button>
        </div>
        {saving && (
          <div className="flex justify-center mt-4">
            <div className="loader w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WordList;
