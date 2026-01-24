import st from './Documents.module.scss';
import { Button, Card, Descriptions } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useDocumentList } from '~/routes/application/components/Documents/useDocumentList';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { USER_HOST } from '~/api/config';

const Documents = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  const { data, isPending } = useDocumentList(application.id);

  const download = (rawUrl: string) => {
    window.open(`${USER_HOST}${rawUrl}`, '_blank');
  };

  const empty = <>Пока отсутствует</>;

  if (isPending || !data) {
    return <>Загрузка...</>;
  }

  return (
    <div className={st.main}>
      <Card>
        <Descriptions
          title="Заявки"
          column={2}
          layout={'vertical'}
          size={'middle'}
        >
          <Descriptions.Item label="Заявка принципала">
            {data.applicationPrincipal ? (
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size={'middle'}
                onClick={() => {
                  if (data.applicationPrincipal) {
                    download(data.applicationPrincipal);
                  }
                }}
              >
                Заявка принципала
              </Button>
            ) : (
              empty
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Заявка агента">
            {data.applicationAgent ? (
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size={'middle'}
                onClick={() => {
                  if (data.applicationAgent) {
                    download(data.applicationAgent);
                  }
                }}
              >
                Заявка агента
              </Button>
            ) : (
              empty
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card>
        <Descriptions
          title="Другие"
          column={2}
          layout={'vertical'}
          size={'middle'}
        >
          <Descriptions.Item label="Платежное поручение">
            {data.applicationPayment ? (
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size={'middle'}
                onClick={() => {
                  if (data.applicationPayment) {
                    download(data.applicationPayment);
                  }
                }}
              >
                Платежное поручение
              </Button>
            ) : (
              empty
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Протокол торгов">
            {data.applicationProtocol ? (
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size={'middle'}
                onClick={() => {
                  if (data.applicationProtocol) {
                    download(data.applicationProtocol);
                  }
                }}
              >
                Протокол торгов
              </Button>
            ) : (
              empty
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Documents;
