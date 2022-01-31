import { AppConfig } from '../config/appConfig';
import {
  Message,
  MessageAttachment,
  MessageEmbed,
  TextChannel,
  VoiceChannel
} from 'discord.js';
import Application from '../components/application/application';
import * as fs from 'fs';
import color from './color';

export class UtilsDiscord {
  public static updateGuildsStatus = async (client: Application) => {
    if (AppConfig.development) return;

    const channelGuild =
      client.channels.cache.get(AppConfig.guild_count_channel) ??
      (await client.channels.fetch(AppConfig.guild_count_channel));

    if (channelGuild && channelGuild instanceof VoiceChannel)
      await channelGuild.setName(`Guilds: ${client.guilds.cache.size}`);
  };

  public static updateMembersStatus = async (client: Application) => {
    if (AppConfig.development) return;

    const guild =
      client.guilds.cache.get(AppConfig.luluchan_guild_id) ??
      (await client.guilds.fetch(AppConfig.luluchan_guild_id));

    const channelMember =
      client.channels.cache.get(AppConfig.member_count_channel) ??
      (await client.channels.fetch(AppConfig.member_count_channel));

    if (channelMember && channelMember instanceof VoiceChannel)
      await channelMember.setName(`Members: ${guild.memberCount}`);
  };

  public static directMessage = async (
    client: Application,
    message: Message
  ) => {
    const channel =
      client.channels.cache.get(AppConfig.channel.direct_message) ??
      (await client.channels.fetch(AppConfig.channel.direct_message));

    if (channel && channel instanceof TextChannel) {
      const embed = new MessageEmbed({
        color: message.author.hexAccentColor ?? color.default_color,
        author: {
          name: message.author.username + '#' + message.author.discriminator,
          iconURL: message.author.displayAvatarURL()
        },
        timestamp: new Date(),
        footer: {
          text: message.author.id
        },
        description: message.content
      });
      await channel.send({
        embeds: [embed]
      });
    }
  };

  public static sendError = async (
    client: Application,
    command: string,
    error: any
  ) => {
    const channel =
      client.channels.cache.get(AppConfig.channel.error) ??
      (await client.channels.fetch(AppConfig.channel.error));

    if (channel && channel instanceof TextChannel) {
      const now = new Date().getTime();
      const path = 'temp/' + `error-${command}-${now}.json`;
      fs.writeFileSync(path, JSON.stringify(error, null, 4));

      const embed = new MessageEmbed({
        color: color.danger,
        timestamp: new Date(),
        description: `Error detected in the command: ${command}`
      });
      await channel.send({
        embeds: [embed],
        files: [new MessageAttachment(path)]
      });

      fs.unlinkSync(path);
    }
  };
}
