export interface IUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    enabled: boolean;
    activated?: boolean;
    createdTime?: string;
    createdBy?: string;
    modifiedBy?: string;
    modifiedTime?: string;
    password?: string;
    lastLogin?: string;
    roles: Array<string>;
    photoUrl?: string;
  }
