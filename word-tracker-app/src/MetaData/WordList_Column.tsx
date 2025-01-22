import React from "react";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Word } from "../Types/Word_Types";
import type { Breakpoint } from "antd/es/_util/responsiveObserver";

export const GetColumns = (
  handleEdit: (record: Word) => void,
  renderDelete: (id: string) => React.ReactNode
): ColumnsType<Word> => [
  {
    title: "Word",
    dataIndex: "word",
    key: "word",
    responsive: ["xs", "sm", "md", "lg", "xl"] as Breakpoint[],
    className: "text-sm sm:text-base",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
    responsive: ["sm", "md", "lg", "xl"] as Breakpoint[],
    className: "text-sm sm:text-base",
  },
  {
    title: "Meaning",
    dataIndex: "meaning",
    key: "meaning",
    responsive: ["md", "lg", "xl"] as Breakpoint[],
    className: "text-sm sm:text-base",
  },
  {
    title: "Example Sentence",
    dataIndex: "exampleSentence",
    key: "exampleSentence",
    responsive: ["lg", "xl"] as Breakpoint[],
    className: "text-sm sm:text-base",
  },
  {
    title: "Actions",
    key: "actions",
    responsive: ["xs", "sm", "md", "lg", "xl"] as Breakpoint[],
    render: (_: any, record: Word) => (
      <Space size="middle">
        <button
          className="bg-primary text-white py-2 px-4 rounded hover:bg-lavender-light"
          onClick={() => handleEdit(record)}
        >
          Edit
        </button>
        {renderDelete(record.id)}
      </Space>
    ),
    className: "text-sm sm:text-base",
  },
];
