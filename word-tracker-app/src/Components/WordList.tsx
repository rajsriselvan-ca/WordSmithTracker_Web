import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { GetColumns } from "../MetaData/WordList_Column";
import Loader from "../UIComponents/Loader";
import EditWordModal from "../UIComponents/EditWordModal";
import DeleteConfirmationModal from "../UIComponents/DeleteConfirmationModal";
import { UseWordList } from "../CustomHooks/UseWordList";
import { GET_WORDS } from "../GraphQL/Queries/Words_Queries";
import { Word } from "../Types/Word_Types";
import { PaginationConfig } from "../Types/TablePagination_Types";

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
    currentPage,
    setCurrentPage,
    pageSize,
    notifyError,
  } = UseWordList();

  const data: Word[] = wordData?.getWords?.words || [];
  const totalRecords: number = wordData?.getWords?.total || 0;

  const handleTableChange = (pagination: PaginationConfig) => {
    const newPage = pagination.current || 1;
    setCurrentPage(newPage);
    loadWords({ variables: { userId, page: newPage, limit: pageSize } });
  };

  const columns: ColumnsType<Word> = GetColumns(
    handleEdit,
    (id: string) => (
      <DeleteConfirmationModal
        key={`delete-${id}`}
        id={id}
        userId={userId}
        deleteWord={deleteWord}
        cacheQuery={GET_WORDS}
        onSuccess={() => loadWords({ variables: { userId, page: currentPage, limit: pageSize } })}
        onError={(errorMessage: string) => notifyError("Sorry!", errorMessage)}
      />
    ));

  if (wordsLoading || languagesLoading) return <Loader />;

  return (
    <div>
      <h1 className="font-bold mb-4 text-theme">List Of Words</h1>
      <div className="min-w-[300px]">
        <Table<Word>
          dataSource={data}
          columns={columns}
          rowKey={(record) => record.id}
          loading={wordsLoading}
          pagination={{
            current: currentPage,
            pageSize,
            total: totalRecords,
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
          scroll={{ x: true }}
        />
      </div>
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
