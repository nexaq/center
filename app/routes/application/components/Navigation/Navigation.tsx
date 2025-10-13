import { Breadcrumb, Button, Flex } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Flex align={'center'} gap={'middle'}>
      <Button onClick={() => navigate('/')} icon={<ArrowLeftOutlined />} />
      <Breadcrumb
        items={[
          {
            title: 'Главная',
            href: '/',
            onClick: (e) => {
              e.preventDefault();
              navigate('/');
            },
          },
          { title: 'Лот' },
        ]}
      />
    </Flex>
  );
};

export default Navigation;
