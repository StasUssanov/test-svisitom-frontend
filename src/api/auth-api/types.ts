export interface IApiClient {
  //
}

export enum AxiosError {
  ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS',
  ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE',
  ERR_BAD_OPTION = 'ERR_BAD_OPTION',
  ERR_NETWORK = 'ERR_NETWORK',
  ERR_DEPRECATED = 'ERR_DEPRECATED',
  ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE',
  ERR_BAD_REQUEST = 'ERR_BAD_REQUEST',
  ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT',
  ERR_INVALID_URL = 'ERR_INVALID_URL',
  ERR_CANCELED = 'ERR_CANCELED',
  ECONNABORTED = 'ECONNABORTED',
  ETIMEDOUT = 'ETIMEDOUT',
}

export type TCommon = {
  status: string;
}

export type TSignUp = {
  signUp: TCommon & {
    accessToken?: string;
    refreshToken?: string;
  }
}

export type TSignIn = {
  signIn: TCommon & {
    accessToken?: string;
    refreshToken?: string;
  }
}

export type TSignOut = {
  signOut: TCommon;
}
