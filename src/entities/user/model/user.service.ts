import type { IUser } from '@entities/user/model/types.ts';
import { client } from '@shared/api';

class UserService {
  async getData() {
    const response = await client.get<IUser, IUser | null>({
      url: 'user',
      defaultValue: null,
    });

    return response.data ?? null;
  }
}

const userService = new UserService();

export default userService;
