import { AppConfig } from '../config/appConfig';
import { Message, MessageEmbed, TextChannel, VoiceChannel } from 'discord.js';
import Application from '../components/application/application';
import color from './color';

export class UtilsDiscord {
  public static updateGuildsStatus = async (client: Application) => {
    if (AppConfig.development) return;

    const channelGuild = client.channels.cache.get(
      AppConfig.guild_count_channel
    );
    if (channelGuild && channelGuild instanceof VoiceChannel)
      await channelGuild.setName(`Guilds: ${client.guilds.cache.size}`);
  };

  public static updateMembersStatus = async (client: Application) => {
    if (AppConfig.development) return;

    const guild = client.guilds.cache.get(AppConfig.luluchan_guild_id);
    const channelMember = client.channels.cache.get(
      AppConfig.member_count_channel
    );
    if (channelMember && channelMember instanceof VoiceChannel)
      await channelMember.setName(`Members: ${guild.memberCount}`);
  };

  public static directMessage = async (
    client: Application,
    message: Message
  ) => {
    const channel = client.channels.cache.get(AppConfig.log_direct_message);
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
}
