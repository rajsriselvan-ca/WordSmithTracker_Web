import { notification } from "antd";

const notifyError = (message: string, description?: string): void => {
  notification.error({
    message,
    description,
  });
};

const notifyWarning = (message: string, description?: string): void => {
  notification.warning({
    message,
    description,
  });
};

const notifySuccess = (message: string, description?: string): void => {
  notification.success({
    message,
    description,
  });
};

export { notifyError, notifyWarning, notifySuccess };
