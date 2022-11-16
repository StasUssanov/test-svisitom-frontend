import React, { useState } from 'react';
import { useRepository } from '__root/repositories/statuses.use-repository';
import { useTranslation } from 'react-i18next';
import { coreApi, TStatusDto } from '__root/api';
import { message } from 'antd';

export const usePresenter = () => {
  const { t } = useTranslation('home');
  const { data, mutate, isLoading } = useRepository();
  const [loading, setLoading] = useState(false);

  const handlerToggleStatus = (selectedRowKeys: React.Key[], valueStatuses: boolean, callback?: () => void) => {
    setLoading(true);

    const statuses: TStatusDto[] = selectedRowKeys.map(item => ({
      uuid: item.toString(),
      status: valueStatuses,
    }));

    coreApi.groupUpdateStatus(statuses)
      .then((response) => {
        if (response.status === 'SUCCESS') {
          if (response.data) mutate(response.data);
          message.success(t('message.statusChanged')).then();
          callback?.();
        } else {
          message.error(t(`message.${response.status}`)).then();
        }
      })
      .finally(() => setLoading(false));
  };

  const handlerUpdate = (status: TStatusDto, callback?: () => void) => {
    setLoading(true);
    coreApi.updateStatus(status)
      .then((response) => {
        if (response.status === 'SUCCESS') {
          if (response.data) mutate(response.data);
          message.success(t('message.statusChanged')).then();
          callback?.();
        } else {
          message.error(t(`message.${response.status}`)).then();
        }
      })
      .finally(() => setLoading(false));
  };

  return ({
    loading: loading || isLoading,
    dataSource: data,
    toggleStatus: handlerToggleStatus,
    update: handlerUpdate,
  });
};
