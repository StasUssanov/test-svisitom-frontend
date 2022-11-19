import { ApiClient } from '../api-client';
import gql from 'graphql-tag';
import { TSignIn, TSignOut, TSignUp } from './types';

export class AuthApi extends ApiClient {

  constructor(baseURL: string) {
    super(`${baseURL}`);
  }

  signUp(params: { username: string, password: string }) {
    const query = gql`mutation {
        signUp(
            username: "${params.username}",
            password: "${params.password}"
        ) {
            status
            accessToken
            refreshToken
        }   
    }`;
    return this.sendGraphqlQuery<TSignUp>(query).then(response => {
      return response.signUp;
    });
  }

  signIn(params: { username: string, password: string }) {
    const query = gql`mutation {
        signIn(
            username: "${params.username}",
            password: "${params.password}"
        ) {
            status
            accessToken
            refreshToken
        }
    }`;
    return this.sendGraphqlQuery<TSignIn>(query).then(response => {
      return response.signIn;
    });
  }

  signOut() {
    const query = gql`mutation {
        signOut {
            status
        }
    }`;
    return this.sendGraphqlQuery<TSignOut>(query).then((response) => {
      return response.signOut;
    });
  }
}
