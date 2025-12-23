import { Button } from 'antd';
import React, {useContext, useState} from 'react';
import AcceptModal from '~/routes/application/components/Review/AcceptButton/AcceptModal/AcceptModal';
import type {ApplicationWithAdminStatus} from "~/api/application/types";
import {AllCheckboxCheckContext} from "~/components/AllCheckboxCheck/AllCheckboxCheckWrapper";

const AcceptButton = ({ application }: {
  application: ApplicationWithAdminStatus;
}) => {
  const { items, checked, setIsError } = useContext(AllCheckboxCheckContext);

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          const selectedTotal = Object.keys(checked).filter(i => checked[i]).length;
          const itemsTotal = items.size;

          if (selectedTotal < itemsTotal) {
            setIsError(true);
            return;
          }
          setIsError(false);
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
