import React from "react";
import { Modal, Input, Select } from "antd";
import Loader from "../UIComponents/Loader.tsx";
import { EditWordModalProps } from "../Types/EditWordModal_Types.ts";

const { TextArea } = Input;
const { Option } = Select;

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
          {languageData?.map((lang) => (
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
      {saving && <Loader />}
    </Modal>
  );
};

export default EditWordModal;
