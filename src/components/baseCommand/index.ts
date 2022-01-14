import { Message, MessageEmbed, MessageEmbedOptions, User } from 'discord.js';
import Application from '../application/application';
import { APIEmbed } from 'discord-api-types';
import { Settings } from '../../lib/constants';
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
  multipleCommand: boolean;

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
  abstract multipleCommand: boolean;

  public client: Application | null = null;
  public message: Message | null = null;
  public setting: Settings | null = null;

  public author: User;

  protected constructor({ client, message, setting }) {
    if (!client) return;
    this.client = client;
    this.message = message;
    this.setting = setting;

    this.author = message.author;
  }

  public embed = (options?: MessageEmbed | MessageEmbedOptions | APIEmbed) => {
    return new MessageEmbed(options).setColor(
      options.color ?? this.setting.color
    );
  };

  public messageEmbed = (options: MessageEmbedOptions) => {
    return this.message.channel.send({ embeds: [this.embed(options)] });
  };

  abstract execute(): Promise<Message>;
}
