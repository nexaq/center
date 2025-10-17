import { Button } from 'antd';
import React, { useState } from 'react';
import ApplicationCancelModal from '~/components/ApplicationCancel/ApplicationCancelModal.tsx/ApplicationCancelModal';
import type {ApplicationWithAdminStatus} from "~/api/application/types";

const ApplicationCancel = ({ application }: { application: ApplicationWithAdminStatus }) => {
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
      <ApplicationCancelModal setOpen={setOpen} open={open} application={application} />
    </>
  );
};

export default ApplicationCancel;
