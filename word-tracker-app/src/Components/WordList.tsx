import React from "react";
import { Table } from "antd";
import { GetColumns } from "../MetaData/WordList_Column.tsx";
import Loader from "../UIComponents/Loader.tsx";
import EditWordModal from "../UIComponents/EditWordModal.tsx";
import DeleteConfirmationModal from "../UIComponents/DeleteConfirmationModal.tsx";
import { UseWordList } from "../CustomHooks/UseWordList.ts";
import { GET_WORDS } from "../GraphQL/Queries/Words_Queries.ts";
import { notifyError } from "../Shared/Notification.ts";

const WordList: React.FC = () => {
  const {
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
  } = UseWordList();

  const columns = GetColumns(handleEdit, (id: string) => (
    <DeleteConfirmationModal
      id={id}
      userId={userId}
      deleteWord={deleteWord}
      cacheQuery={GET_WORDS}
      onSuccess={() => loadWords({ variables: { userId } })}
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
