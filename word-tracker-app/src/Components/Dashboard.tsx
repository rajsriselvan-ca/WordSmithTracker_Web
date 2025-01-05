import React from 'react';
import { Result } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <Result
      icon={<InfoCircleOutlined />}
      title="Coming Soon!"
      subTitle="Exciting things are on the way! This feature will be available soon."
    />
  );
};

export default Dashboard;
