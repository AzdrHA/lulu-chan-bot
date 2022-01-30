import { HexColorString } from 'discord.js';

export type CommandCategory =
  | 'emote'
  | 'reaction'
  | 'hentai'
  | 'porn'
  | 'misc'
  | 'setting';

export type Setting = {
  id: number;
  prefix: string;
  color: HexColorString;
  language: string;
  createdAt: string;
  updateAt: string;
};

export type Guild = {
  id: number;
  guild: string;
  createdAt: Date;
  updateAt: Date;
  setting: Setting;
};

export const commands = new Map<CommandCategory, string[]>();
export const settings = new Map<string, Setting>();
export const commandsList = new Map<string, any>();
export const getProjectDir = process.cwd();
export const getAppDir = getProjectDir + '/src';
export const commandsDir = getAppDir + '/commands';
export const eventsDir = getAppDir + '/events';
export const socketDir = getAppDir + '/sockets';
