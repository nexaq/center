import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import {USER_HOST} from "~/api/config";

const FileUpload = ({ id, onChange, disabled }: { id: number, onChange: (v: string) => void, disabled?: boolean }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    disabled,
    multiple: false,
    name: 'file',
    maxCount: 1,
    withCredentials: true,
    action: `${USER_HOST}/center/application/${id}/upload-protocol`,
    onChange(info) {
      if (!info.fileList.length) {
        onChange('');
      }

      if (info.file.status !== 'uploading') {
        onChange('');
      }
      if (info.file.status === 'done') {
        onChange(info.file.name);
        messageApi.success('Успешно загружен')
      } else if (info.file.status === 'error') {
        onChange('');
        messageApi.error('Ошибка')
      }
    },
  };

  return (
    <>
      {contextHolder}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default FileUpload;
