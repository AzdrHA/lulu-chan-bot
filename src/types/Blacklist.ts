import { User } from './User';

export type Blacklist = {
  id: number;
  reason: string;
  createdAt: Date;
  updateAt: Date;
  removeAt: Date | null;
  user: User;
};
