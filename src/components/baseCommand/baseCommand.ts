import { Message, MessageEmbed, MessageEmbedOptions, User } from 'discord.js';
import Application from '../application/application';
import { APIEmbed } from 'discord-api-types';
import translations from '../translations/translations';
import color from '../../utils/color';
import emoji from '../../utils/emoji';
import { UtilsDiscord } from '../../utils/utilsDiscord';
import { Category } from '../../types/Category';
import { Setting } from '../../types/Setting';
import { CommandConstructor } from '../../types/CommandConstructor';

export type BaseCommandType = {
  alias: string[];
  allowDM: boolean;
  category: Category;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  execute: () => Promise<Message>;
};

export abstract class BaseCommand implements BaseCommandType {
  public abstract alias: string[];
  public abstract allowDM: boolean;
  public abstract category: Category;
  public abstract cooldown: number;
  public abstract description: string;
  public abstract disable: boolean;
  public abstract example: string;
  public abstract onlyDev: boolean;
  public abstract multipleCommand: boolean;
  public readonly command: string;

  public readonly client: Application | null = null;
  public readonly message: Message | null = null;
  public readonly setting: Setting = {
    id: 0,
    prefix: 'l!',
    color: color.default_color,
    language: 'en',
    createdAt: '',
    updateAt: ''
  };

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

  public warningMessage = (options: MessageEmbedOptions) => {
    options.color = color.warning;
    options.description = `${emoji.warning} ${options.description}`;
    return this.messageEmbed(options);
  };

  public errorMessage = (options: MessageEmbedOptions) => {
    options.color = color.danger;
    options.description = `${emoji.error} ${options.description}`;
    return this.messageEmbed(options);
  };

  public accessDenied = (options: MessageEmbedOptions) => {
    options.color = color.danger;
    options.description = `${emoji.denied} ${options.description}`;
    return this.messageEmbed(options);
  };

  public successMessage = (options: MessageEmbedOptions) => {
    options.color = color.success;
    options.description = `${emoji.success} ${options.description}`;
    return this.messageEmbed(options);
  };

  public crashMessage = (client: Application, command: string, error: any) => {
    UtilsDiscord.sendError(client, command, error);
    return this.errorMessage({
      description: this.translation('ERROR_DETECTED')
    });
  };

  public translation = (key: string, variables?: object) =>
    translations(key, {
      lang: this.setting.language || 'en',
      variables: variables
    });

  abstract execute(): Promise<Message>;
}
