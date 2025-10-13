import { Button } from 'antd';
import React, { useState } from 'react';
import AcceptModal from '~/routes/application/components/Review/AcceptButton/AcceptModal/AcceptModal';
import type {ApplicationWithAdminStatus} from "~/api/application/types";

const AcceptButton = ({ application }: {
  application: ApplicationWithAdminStatus;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Все правильно
      </Button>
      <AcceptModal open={open} setOpen={setOpen} application={application} />
    </>
  );
};

export default AcceptButton;
