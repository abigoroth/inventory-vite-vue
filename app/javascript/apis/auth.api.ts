import { http } from '@/services/http.service';
import { IRegisterUser, IUserLogin } from '@/types/general';
import { AxiosResponse } from 'axios';

export const login = (user: IUserLogin): Promise<AxiosResponse> => {
  return http.post('users/login', { user });
};

export const logout = (): Promise<AxiosResponse> => {
  return http.delete('users/logout');
};

export const register = (user: IRegisterUser): Promise<AxiosResponse> => {
  return http.post('users/signup', { user });
};
