import React from "react";
import { Space } from "antd";
import { Word } from "../Types/Word_Types";

export const GetColumns = (
  handleEdit: (record: Word) => void,
  renderDelete: (id: string) => React.ReactNode // Pass the delete modal as a render function
) => [
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
    render: (_: any, record: Word) => (
      <Space size="middle">
        <button
          className="bg-primary text-white py-2 px-4 rounded hover:bg-lavender-light"
          onClick={() => handleEdit(record)}
        >
          Edit
        </button>
        {renderDelete(record.id)} {/* Render the delete modal */}
      </Space>
    ),
  },
];
