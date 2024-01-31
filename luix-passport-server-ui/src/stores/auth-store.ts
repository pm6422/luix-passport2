import { ref } from "vue";
import { defineStore } from "pinia";
import type { IAuthUser } from '@/domain/AuthUser';

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IAuthUser>({} as IAuthUser);
  const isAuthenticated = ref(false);
  const errors = ref({});

  function setAuth(authUser: IAuthUser) {
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
    setAuth,
    deleteAuth,
    setError,
    user,
    isAuthenticated,
    errors
  };
});
