import { HexColorString } from 'discord.js';
import { Language } from './Language';

export type Setting = {
  id: number;
  prefix: string;
  color: HexColorString;
  language: Language;
  createdAt: string;
  updateAt: string;
};
