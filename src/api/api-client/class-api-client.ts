import axios, { AxiosInstance } from 'axios';
import { IApiClient, TGraphqlQueryVariables } from './types';
import { DocumentNode } from 'graphql/language';
import { config as appConfig } from '__root/config';

export abstract class ApiClient implements IApiClient {
  protected _client: AxiosInstance;

  protected constructor(baseURL: string) {
    const headers: { contentType: string } = { contentType: 'application/json' };
    this._client = axios.create({ baseURL, headers });
  }

  protected getGqlString(doc: DocumentNode): string | undefined {
    return doc.loc && doc.loc.source.body;
  }

  protected sendGraphqlQuery<R>(query: DocumentNode, variables?: TGraphqlQueryVariables): Promise<R> {

    // TODO Добавить логигу для обновления токенов в случае 403

    this._client.interceptors.request.use(async config => {
      const token = localStorage.getItem(appConfig.tokens.access);
      if (token) config.headers = { 'Authorization': `Bearer ${token}` };
      return config;
    });

    return this._client.post('', {
      query: this.getGqlString(query),
      variables: variables,
    }).then(response => response.data.data);
  }
}
