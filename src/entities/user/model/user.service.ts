import type { IUser, IUserResponse, IUserStats } from '@entities/user/model/types.ts';
import { client } from '@shared/api';

class UserService {
  async getData(id: number) {
    const response = await client.get<IUserResponse, IUserResponse['data'] | null>({
      url: `user/${id}`,
      defaultValue: null,
      transform: (data) => data.data,
    });

    return response.data ?? null;
  }

  async getStats(id: number) {
    const response = await client.get<IUserStats, IUserStats | null>({
      url: `user/${id}/stats`,
    });

    return response.data;
  }
}

const userService = new UserService();

export default userService;
