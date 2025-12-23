import { Button } from 'antd';
import React, { useState } from 'react';
import ApplicationCancelModal from '~/components/ApplicationCancel/ApplicationCancelModal.tsx/ApplicationCancelModal';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { ApplicationAdminStatus } from '~/api/application/getList';

const ApplicationCancel = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        disabled={application.adminStatus === ApplicationAdminStatus.RESULT || application.isRejected}
        color="danger"
        variant={'outlined'}
        onClick={() => {
          console.log('CUNT');
          setOpen(true);
        }}
      >
        Отклонить заявку
      </Button>
      <ApplicationCancelModal
        setOpen={setOpen}
        open={open}
        application={application}
      />
    </>
  );
};

export default ApplicationCancel;
