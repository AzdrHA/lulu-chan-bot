import { Message } from 'discord.js';
export type CategoryInterface =
  | 'moderator'
  | 'image'
  | 'emote'
  | 'reaction'
  | 'hentai'
  | 'porn'
  | 'misc'
  | 'setting'
  | 'admin'
  | 'nsfw'
  | 'music';

export type BaseCommandType = {
  alias: string[];
  allowDM: boolean;
  category: CategoryInterface;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;

  execute: () => Promise<Message>;
};

export abstract class BaseCommand implements BaseCommandType {
  abstract alias: string[];
  abstract allowDM: boolean;
  abstract category: CategoryInterface;
  abstract cooldown: number;
  abstract description: string;
  abstract disable: boolean;
  abstract example: string;
  abstract onlyDev: boolean;

  abstract execute(): Promise<Message>;
}
