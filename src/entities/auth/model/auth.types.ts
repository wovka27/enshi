import type { IUser } from '@entities/user/model';

export interface ILoginRequestData {
  email: string;
  password: string;
}

export interface ILoginErrorData {
  errors?: Record<string, string[]>;
  message: string;
  success: false;
}

export interface ILoginSuccessData {
  data: {
    access_token: string;
    user: IUser;
  };
  message: string;
  success: true;
}

export interface ILoginConfirmData {
  data: {
    send_email: true;
  };
  message: string;
  success: false;
}

export type ILoginResponseData = ILoginErrorData | ILoginSuccessData | ILoginConfirmData;

export interface IRegisterRequestData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IRegisterResponseData {
  status: string;
  message: string;
  data: {
    send_email: boolean;
  };
}

export interface IVerifyRequestData {
  email: string;
  message_type: 'email' | 'password';
}

export interface ICheckVerifyRequestData {
  email: string;
  code: string;
  message_type: 'email' | 'password';
}

export interface IVerifyResponseData {
  status: boolean;
  message: string;
  data: {
    user: IUser;
    access_token: string;
  };
}
