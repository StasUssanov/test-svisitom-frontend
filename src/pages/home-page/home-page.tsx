import React from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '__root/components';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      {t('common:label.homePage')}
    </MainLayout>
  );
};
