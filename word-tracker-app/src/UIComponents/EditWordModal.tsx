import React from "react";
import { Modal } from "antd";
import Loader from "../UIComponents/Loader";
import { EditWordModalProps } from "../Types/EditWordModal_Types";
import InputField from "./InputField"; 

const EditWordModal: React.FC<EditWordModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  formState,
  setFormState,
  languageData,
  saving,
  handleSaveEdit,
}) => {
  return (
    <Modal
      open={isModalVisible}
      footer={null}
      style={{ top: 50 }} 
      onCancel={() => setIsModalVisible(false)}
    >
      <InputField
        id="word"
        label="Edit Word"
        value={formState.word}
        onChange={(e) =>
          setFormState({ ...formState, word: e.target.value })
        }
        placeholder="Word"
        required
      />
      <InputField
        id="language"
        label="Language"
        value={formState.language}
        onChange={(e) =>
          setFormState({ ...formState, language: e.target.value })
        }
        type="select"
        selectOptions={languageData || []}
        placeholder="Select Language"
        required
      />
      <InputField
        id="meaning"
        label="Meaning"
        value={formState.meaning}
        onChange={(e) =>
          setFormState({ ...formState, meaning: e.target.value })
        }
        placeholder="Meaning"
        required
      />
      <InputField
        id="exampleSentence"
        label="Example Sentence"
        value={formState.exampleSentence}
        onChange={(e) =>
          setFormState({ ...formState, exampleSentence: e.target.value })
        }
        placeholder="Enter example sentence"
        required
        type="textarea"
      />
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
      {saving && <Loader />}
    </Modal>
  );
};

export default EditWordModal;
