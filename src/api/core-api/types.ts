import { TCommon } from '__root/api';
import { Moment } from 'moment/moment';

export type TStatusDto = {
  uuid: string;
  serialNumber?: string;
  name?: string;
  date?: Moment;
  status?: boolean;
}

export type TStatuses = {
  statuses: TCommon & {
    data?: TStatusDto[];
  }
}

export type TStatusUpdate = {
  statusUpdate: TCommon & {
    data?: TStatusDto;
  }
}

export type TStatusGroupUpdate = {
  statusGroupUpdate: TCommon & {
    data?: TStatusDto[];
  }
}
