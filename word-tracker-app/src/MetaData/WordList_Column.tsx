import React from "react";
import { Space, Button } from "antd";
import { Word } from "../Types/Word_Types"; 

export const GetColumns = (
  handleEdit: (record: Word) => void,
  handleDelete: (id: string) => void
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
        <Button danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      </Space>
    ),
  }
];
