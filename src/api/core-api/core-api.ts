import { ApiClient, TGraphqlQueryVariables } from '../api-client';
import gql from 'graphql-tag';
import { TStatusUpdate, TStatusDto, TStatuses, TStatusGroupUpdate } from './types';

export class CoreApi extends ApiClient {

  constructor(baseURL: string) {
    super(`${baseURL}`);
  }

  getStatuses() {
    const query = gql`query {
        statuses {
            status
            data {
                uuid
                serialNumber
                name
                date
                status
            }
        }
    }`;
    return this.sendGraphqlQuery<TStatuses>(query).then((response) => response.statuses);
  }

  updateStatus(params: TStatusDto) {
    const query = gql`mutation Mutation($variables: CoreStatusRequestDto!)  {
        statusUpdate(status: $variables){
            status
            data {
                uuid
                serialNumber
                name
                date
                status
            }
        }
    }`;
    const variables: TGraphqlQueryVariables = {
      variables: {
        ...params,
        date: params.date?.toString(),
      },
    };
    return this.sendGraphqlQuery<TStatusUpdate>(query, variables)
      .then((response) => response.statusUpdate);
  }

  groupUpdateStatus(params: TStatusDto[]) {
    const query = gql`mutation Mutation($variables: [CoreStatusRequestDto!]!)  {
        statusGroupUpdate(statuses: $variables){
            status
            data {
                uuid
                serialNumber
                name
                date
                status
            }
        }
    }`;
    const variables: TGraphqlQueryVariables = {
      variables: params.map(item => ({
        ...item,
        date: item.date?.toString(),
      })),
    };
    return this.sendGraphqlQuery<TStatusGroupUpdate>(query, variables)
      .then((response) => response.statusGroupUpdate);
  }
}
