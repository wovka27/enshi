import type {
  ICheckVerifyRequestData,
  ILoginRequestData,
  ILoginResponseData,
  IRegisterRequestData,
  IVerifyRequestData,
  IVerifyResponseData,
} from '@entities/auth/model';
import { client } from '@shared/api';

class AuthService {
  login(data: ILoginRequestData) {
    return client.post<ILoginResponseData, ILoginResponseData, ILoginRequestData>({
      url: 'auth/login',
      payload: data,
    });
  }

  register(data: IRegisterRequestData) {
    return client.post<ILoginResponseData, ILoginResponseData, IRegisterRequestData>({
      url: 'auth/register',
      payload: data,
    });
  }

  logout() {
    return client.post({ url: 'auth/logout' });
  }

  verify(data: ICheckVerifyRequestData) {
    return client.post<IVerifyResponseData, IVerifyResponseData, ICheckVerifyRequestData>({
      url: 'auth/verify-code',
      payload: data,
    });
  }

  sendVerify(data: IVerifyRequestData) {
    return client.post<IVerifyResponseData, IVerifyResponseData, IVerifyRequestData>({
      url: 'auth/send-verify-code',
      payload: data,
    });
  }
}

const authService = new AuthService();

export default authService;
