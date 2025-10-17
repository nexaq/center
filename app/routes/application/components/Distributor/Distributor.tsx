import type { ApplicationWithAdminStatus } from '~/api/application/types';
import type { LotModel } from '~/api/lot/types';
import { ApplicationAdminStatus } from '~/api/application/getList';
import Review from '~/routes/application/components/Review/Review';
import BidCorrection from '~/routes/application/components/Distributor/BidCorrection/BidCorrection';
import DepositDetails from '~/routes/application/components/Distributor/DepositDetails/DepositDetails';
import InWork from '~/routes/application/components/Distributor/InWork/InWork';

const distributor = ({
  application,
  lot,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
}) => {
  if (application.isRejected) {
    return undefined;
  }

  if (application.adminStatus === ApplicationAdminStatus.REVIEW) {
    return <Review application={application} lot={lot} />;
  }

  if (application.adminStatus === ApplicationAdminStatus.BID_CORRECTION) {
    return <BidCorrection lot={lot} application={application} />;
  }

  if (application.adminStatus === ApplicationAdminStatus.DEPOSIT_DETAILS) {
    return <DepositDetails application={application} />;
  }

  if (application.adminStatus === ApplicationAdminStatus.IN_WORK) {
    return <InWork application={application} />;
  }
};

export default distributor;
