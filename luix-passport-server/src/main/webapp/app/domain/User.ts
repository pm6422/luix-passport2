export interface IUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
    mobileNo: string;
    gender: string;
    roles: Array<string>;
    joinedTime: string;
    lastLogin: string;
    createdBy?: string;
    createdTime?: Date;
    updatedBy?: string;
    updatedTime?: Date;
    password?: string;
    enabled: boolean;
    activated?: boolean;
  }
