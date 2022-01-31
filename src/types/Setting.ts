import { HexColorString } from 'discord.js';

export type Setting = {
  id: number;
  prefix: string;
  color: HexColorString;
  language: string;
  createdAt: string;
  updateAt: string;
};
