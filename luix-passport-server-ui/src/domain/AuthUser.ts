export interface IAuthUser {
  name: string;
  email: string;
  password: string;
  roles: Array<string>;
}