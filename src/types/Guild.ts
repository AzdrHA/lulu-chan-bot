import { Setting } from './Setting';

export type Guild = {
  id: number;
  guild: string;
  createdAt: Date;
  updateAt: Date;
  setting: Setting;
};
