import { AppConfig } from '../config/AppConfig';
import {
  Channel,
  Message,
  MessageAttachment,
  MessageEmbed,
  TextChannel,
  VoiceChannel
} from 'discord.js';
import Application from '../components/Application/Application';
import * as fs from 'fs';
import { Snowflake } from 'discord-api-types';
import ColorConfig from '../config/ColorConfig';

export class UtilsDiscord {
  /**
   * @param {Application} client
   * @param {Snowflake} id
   * @return {Promise<Channel>}
   */
  public static getChannel = async (
    client: Application,
    id: Snowflake
  ): Promise<Channel> =>
    client.channels.cache.get(id) ??
    (await client.channels.fetch(id, { force: true }));

  /**
   * @param {Application} client
   * @return {Promise<Channel>}
   */
  public static updateGuildsStatus = async (
    client: Application
  ): Promise<Channel> => {
    if (AppConfig.development) return;

    const channelGuild = await this.getChannel(
      client,
      AppConfig.guild_count_channel
    );

    if (channelGuild && channelGuild instanceof VoiceChannel)
      await channelGuild.setName(`Guilds: ${client.guilds.cache.size}`);

    return channelGuild;
  };

  /**
   * @param {Application} client
   * @return {Promise<Channel>}
   */
  public static updateMembersStatus = async (
    client: Application
  ): Promise<Channel> => {
    if (AppConfig.development) return;

    const guild =
      client.guilds.cache.get(AppConfig.luluchan_guild_id) ??
      (await client.guilds.fetch(AppConfig.luluchan_guild_id));

    const channelMember = await this.getChannel(
      client,
      AppConfig.member_count_channel
    );

    if (channelMember && channelMember instanceof VoiceChannel)
      await channelMember.setName(`Members: ${guild.memberCount}`);

    return channelMember;
  };

  /**
   * @param {Application} client
   * @param {Message} message
   * @return {Promise<Message>}
   */
  public static directMessage = async (
    client: Application,
    message: Message
  ): Promise<Message> => {
    const channel = await this.getChannel(
      client,
      AppConfig.channel.direct_message
    );
    if (!channel || !(channel instanceof TextChannel)) return;

    const messageAttachment = [];
    let i = 1;
    message.attachments.map((attachment) => {
      messageAttachment.push(`[Attachment n°: ${i}](${attachment.attachment})`);
      i++;
    });

    console.log(messageAttachment);

    const embed = new MessageEmbed({
      color: message.author.hexAccentColor ?? ColorConfig.default_color,
      author: {
        name: message.author.username + '#' + message.author.discriminator,
        iconURL: message.author.displayAvatarURL()
      },
      timestamp: new Date(),
      footer: {
        text: message.author.id
      },
      description: message.content + '\n' + messageAttachment.join(', ')
    });

    return channel.send({
      embeds: [embed]
    });
  };

  /**
   * @param {Application} client
   * @param {string} command
   * @param {any} error
   */
  public static sendError = async (
    client: Application,
    command: string,
    error: any
  ): Promise<Message> => {
    const channel = await this.getChannel(client, AppConfig.channel.error);
    if (!channel || !(channel instanceof TextChannel)) return;

    const now = new Date().getTime();
    const path = 'temp/' + `error-${command}-${now}.json`;
    fs.writeFileSync(path, JSON.stringify(error, null, 4));

    const embed = new MessageEmbed({
      color: ColorConfig.danger,
      timestamp: new Date(),
      description: `Error detected in the command: ${command}`
    });

    const message = await channel.send({
      embeds: [embed],
      files: [new MessageAttachment(path)]
    });
    fs.unlinkSync(path);

    return message;
  };
}
