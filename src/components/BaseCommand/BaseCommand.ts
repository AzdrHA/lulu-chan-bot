import {
  GuildMember,
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  User
} from 'discord.js';
import Application from '../Application/Application';
import translations from '../Translations/Translations';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import { Category } from '../../types/Category';
import { Setting } from '../../types/Setting';
import { CommandConstructor } from '../../types/CommandConstructor';
import ColorConfig from '../../config/ColorConfig';
import EmojiConfig from '../../config/EmojiConfig';

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
    color: ColorConfig.default_color,
    language: 'en',
    createdAt: '',
    updateAt: ''
  };

  public readonly author: User;
  public readonly args: string[];
  public member: GuildMember;

  /**
   * @param {Application} client
   * @param {Message} message
   * @param {Setting} setting
   * @param {string} command
   * @param {string[]} args
   * @protected
   */
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
    this.member = this.getMember();
  }

  /**
   * @return {boolean}
   */
  public memberItsMe = (): boolean => {
    return this.member.id === this.author.id;
  };

  /**
   * @return {GuildMember}
   */
  private getMember = (): GuildMember => {
    return (
      (this.message.mentions.members.first() ||
        this.message.guild.members.cache.get(this.args[0])) ??
      this.message.member
    );
  };

  /**
   * @param {MessageEmbedOptions} options
   * @return {MessageEmbed}
   */
  public embed = (options?: MessageEmbedOptions): MessageEmbed => {
    return new MessageEmbed(options).setColor(
      options.color ?? this.setting.color
    );
  };

  /**
   * @param {MessageEmbedOptions} options
   * @return {Promise<Message>}
   */
  public messageEmbed = (options: MessageEmbedOptions): Promise<Message> => {
    return this.message.channel.send({ embeds: [this.embed(options)] });
  };

  /**
   * @param {MessageEmbedOptions} options
   * @return {Promise<Message>}
   */
  public warningMessage = (options: MessageEmbedOptions): Promise<Message> => {
    options.color = ColorConfig.warning;
    options.description = `${EmojiConfig.warning} ${options.description}`;
    return this.messageEmbed(options);
  };

  /**
   * @param {MessageEmbedOptions} options
   * @return {Promise<Message>}
   */
  public errorMessage = (options: MessageEmbedOptions): Promise<Message> => {
    options.color = ColorConfig.danger;
    options.description = `${EmojiConfig.error} ${options.description}`;
    return this.messageEmbed(options);
  };

  /**
   * @param {MessageEmbedOptions} options
   * @return {Promise<Message>}
   */
  public accessDenied = (options: MessageEmbedOptions): Promise<Message> => {
    options.color = ColorConfig.danger;
    options.description = `${EmojiConfig.denied} ${options.description}`;
    return this.messageEmbed(options);
  };

  /**
   * @param {MessageEmbedOptions} options
   * @return {Promise<Message>}
   */
  public successMessage = (options: MessageEmbedOptions): Promise<Message> => {
    options.color = ColorConfig.success;
    options.description = `${EmojiConfig.success} ${options.description}`;
    return this.messageEmbed(options);
  };

  /**
   * @param {Application} client
   * @param {string} command
   * @param {any} error
   * @return {Promise<Message>}
   */
  public crashMessage = async (
    client: Application,
    command: string,
    error: any
  ): Promise<Message> => {
    await UtilsDiscord.sendError(client, command, error);
    return this.errorMessage({
      description: this.translation('ERROR_DETECTED')
    });
  };

  public adminLogMessage = async (
    content: string,
    options?: MessageEmbedOptions
  ) => {
    const embed = new MessageEmbed({
      description: content,
      color: ColorConfig.info,
      timestamp: new Date(),
      ...options
    });
    const channel = this.client.channels.cache.get('942428928151269386');
    if (channel.isText()) return channel.send({ embeds: [embed] });
  };

  /**
   * @param {string} key
   * @param {Object} variables
   * @return {string}
   */
  public translation = (
    key: string,
    variables?: { [key: string]: string }
  ): string =>
    translations(key, {
      lang: this.setting.language || 'en',
      variables: variables
    });

  abstract execute(): Promise<Message>;
}
