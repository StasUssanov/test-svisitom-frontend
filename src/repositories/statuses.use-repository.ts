import useSWR from 'swr';
import { SWR_HOOK } from './swr-hooks';
import { coreApi, TCommon, TStatusDto } from '__root/api';
import { IUseRepository } from './types';
import moment from 'moment';

export const useRepository = (): IUseRepository<TStatusDto[], TStatusDto | TStatusDto[]> => {
  const fetcher = () => coreApi.getStatuses();
  const { data, mutate, error } = useSWR(SWR_HOOK.STATUSES, fetcher);

  const handlerMutate = (data?: TStatusDto | TStatusDto[]) => {
    mutate((cashedData) => {
        if (cashedData?.data) {
          if (Array.isArray(data)) {
            const uuids = new Map();
            data.forEach(item => uuids.set(item.uuid, item));
            cashedData.data = cashedData.data.map(item => {
              if (uuids.has(item.uuid)) return uuids.get(item.uuid);
              return item;
            });

          } else {
            cashedData.data = cashedData.data.map(item => {
              if (item.uuid === data?.uuid) return data;
              return item;
            });
          }
        }
        return cashedData;
      },
      { rollbackOnError: true },
    ).then();
  };

  const mapperResponse = (data?: (TCommon & { data?: TStatusDto[] | undefined })) => {
    return data?.data?.map((item: TStatusDto) => {
      return ({
        ...item,
        date: moment(item.date),
      });
    }) ?? [];
  };

  return {
    data: mapperResponse(data),
    mutate: handlerMutate,
    error,
    isLoading: !error && !data,
  };
};
