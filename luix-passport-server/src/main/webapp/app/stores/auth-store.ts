import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/api-service";
import type { IAuthUser } from '@/domain/AuthUser';

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IAuthUser>({} as IAuthUser);
  const isAuthenticated = ref(false);
  const errors = ref({});

  function verifyAuth() {
    return ApiService.query("open-api/accounts/user", {})
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
        deleteAuth();
      });
  }

  // function login(credentials: IAuthUser) {
  //   return ApiService.post("login", credentials)
  //     .then(({ data }) => {
  //       setAuth(data);
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
  // }

  function logout() {
    ApiService.post("logout", {})
      .then(({ data }) => {
        deleteAuth();
        window.location.reload();
      })
      .catch(({ response }) => {

      });
  }

  // function register(credentials: IAuthUser) {
  //   return ApiService.post("register", credentials)
  //     .then(({ data }) => {
  //       setAuth(data);
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
  // }

  // function forgotPassword(email: string) {
  //   return ApiService.post("forgot_password", email)
  //     .then(() => {
  //       setError({});
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
  // }

  function setAuth(authUser: IAuthUser) {
    if(authUser.username === 'anonymousUser') {
      return;
    }
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
  }

  function deleteAuth() {
    isAuthenticated.value = false;
    user.value = {} as IAuthUser;
    errors.value = [];
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  return {
    errors,
    user,
    isAuthenticated,
    logout,
    verifyAuth,
  };
});
