import AuthService from '@/services/auth.service';
import { IRegisterUser, IUserLogin } from '@/types/general';
import { AxiosResponse } from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';

interface IState {
  user: Record<string, unknown> | null;
}

const initialState: IState = { user: AuthService.getUser() };

export const useAuthStore = defineStore('auth.store', {
  state: (): IState => ({ ...initialState }),
  getters: {
    isAuthenticated: (state: IState) => !!state.user,
  },
  actions: {
    login(user: IUserLogin) {
      return AuthService.login(user).then(
        (userFromApi: AxiosResponse) => {
          this.user = userFromApi.data;
          return Promise.resolve(userFromApi);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
    },
    logout() {
      AuthService.logout().then(() => {
        this.user = null;
      });
    },
    register(user: IRegisterUser) {
      return AuthService.register(user);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
