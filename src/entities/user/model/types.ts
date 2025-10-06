import type { IEntity } from '@entities/entity/model';

export interface IUser extends IEntity {
  email: string;
  rank: string;
  cover: string | null;
  avatar: string | null;
  email_verified_at: Date | null;
  roles: IUserRole[];
}

export interface IUserRole extends IEntity {
  guard_name: string;
  pivot: IUserRolePivot;
}

export interface IUserRolePivot {
  model_type: string;
  model_id: number;
  role_id: number;
}
