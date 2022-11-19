import { config } from '../../config';
import { AuthApi } from './auth-api';

export * from './types';
export const authApi = new AuthApi(config.apiUrl);
