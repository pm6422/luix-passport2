export interface IAuthUser {
  username: string;
  email: string;
  password: string;
  roles: Array<string>;
}