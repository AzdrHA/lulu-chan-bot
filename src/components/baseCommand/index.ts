import { Message, MessageEmbed, MessageEmbedOptions, User } from 'discord.js';
import Application from '../application/application';
import { APIEmbed } from 'discord-api-types';
import { Setting } from '../../lib/constants';
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

export type CommandConstructor = {
  client: Application;
  message: Message;
  setting: Setting;
  command: string;
  args: string[];
};

export abstract class BaseCommand implements BaseCommandType {
  public abstract alias: string[];
  public abstract allowDM: boolean;
  public abstract category: CategoryInterface;
  public abstract cooldown: number;
  public abstract description: string;
  public abstract disable: boolean;
  public abstract example: string;
  public abstract onlyDev: boolean;
  public abstract multipleCommand: boolean;
  public readonly command: string;

  public readonly client: Application | null = null;
  public readonly message: Message | null = null;
  public readonly setting: Setting | null = null;

  public readonly author: User;
  public readonly args: string[];

  protected constructor({
    client,
    message,
    setting,
    command,
    args
  }: CommandConstructor) {
    if (!client) return;
    this.client = client;
    this.message = message;
    this.setting = setting;
    this.command = command;
    this.args = args;

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
