import { Button } from 'antd';
import React, { useState } from 'react';
import ApplicationCancelModal from '~/components/ApplicationCancel/ApplicationCancelModal.tsx/ApplicationCancelModal';

const ApplicationCancel = ({}: {}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        color="danger"
        variant={'outlined'}
        onClick={() => {
          setOpen(true);
        }}
      >
        Отклонить заявку
      </Button>
      <ApplicationCancelModal setOpen={setOpen} open={open} />
    </>
  );
};

export default ApplicationCancel;
