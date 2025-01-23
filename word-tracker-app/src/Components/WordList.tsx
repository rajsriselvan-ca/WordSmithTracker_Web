import React from "react";
import { Table } from "antd";
import { GetColumns } from "../MetaData/WordList_Column";
import Loader from "../UIComponents/Loader";
import EditWordModal from "../UIComponents/EditWordModal";
import DeleteConfirmationModal from "../UIComponents/DeleteConfirmationModal";
import { UseWordList } from "../CustomHooks/UseWordList";
import { GET_WORDS } from "../GraphQL/Queries/Words_Queries";

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

  const data = wordData?.getWords?.words || [];
  const totalRecords = wordData?.getWords?.total || 0;

  const handleTableChange = (pagination : any) => {
    const newPage = pagination.current;
    setCurrentPage(newPage);
    loadWords({ variables: { userId, page: newPage, limit: pageSize } });
  };

  const columns = GetColumns(
    handleEdit,
    (id: string) => (
      <DeleteConfirmationModal
        key={`delete-${id}`} 
        id={id}
        userId={userId}
        deleteWord={deleteWord}
        cacheQuery={GET_WORDS}
        onSuccess={() => loadWords({ variables: { userId, page: currentPage, limit: pageSize } })}
        onError={(errorMessage) => notifyError("Sorry!", errorMessage)}
      />
    ));

  if (wordsLoading || languagesLoading) return <Loader />;

  return (
    <div>
      <h1 className="font-bold mb-4">List Of Words</h1>
      <Table
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
    />
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
