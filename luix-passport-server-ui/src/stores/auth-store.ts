import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import type { IAuthUser } from '@/domain/AuthUser';

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<IAuthUser>({} as IAuthUser);
  const isAuthenticated = ref(!!JwtService.getToken());

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  function login(credentials: IAuthUser) {
    if("client_dummy" === import.meta.env.VITE_APP_AUTH_MODE) {
       // todo: client auth for now
       if(credentials.email === "admin@demo.com" && credentials.password === "demo") {
         setAuth({"name":"Camden","surname":"Lowe","email":"admin@demo.com","password":"***","api_token":"$2y$10$rrQvQ5MIhJEY7ZkVM1jXQ.PY.zj9C\/Z.PN9elVtvVCQlAl0HwJhou"});
       } else {
         setError({"message":"The provided credentials are incorrect","errors":{"email":["The provided credentials are incorrect"]}});
       }
       return;
    } 
    return ApiService.post("login", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function register(credentials: IAuthUser) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function setAuth(authUser: IAuthUser) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.api_token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as IAuthUser;
    errors.value = [];
    JwtService.destroyToken();
  }

  function logout() {
    purgeAuth();
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
