import Application from '../../components/Application/Application';
import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { AppConfig } from '../../config/AppConfig';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import ColorConfig from '../../config/ColorConfig';

/**
 * @param {Application} client
 * @param {Guild} guild
 */
export default async (client: Application, guild: Guild) => {
  const embed = new MessageEmbed({
    author: {
      name: `${client.user.tag} a été ajouté au serveur!`,
      iconURL: client.user.avatarURL()
    },
    description: `Nom du serveur: ${guild.name}`,
    color: ColorConfig.success,
    fields: [
      {
        name: 'Members',
        value: guild.memberCount.toString(),
        inline: true
      }
    ],
    thumbnail: {
      url: guild.iconURL()
    },
    footer: {
      text: `Guild ID: ${guild.id}`
    }
  });

  const channel = await UtilsDiscord.getChannel(
    client,
    AppConfig.channel.add_bot
  );

  if (channel && channel instanceof TextChannel) {
    await channel.send({ embeds: [embed] });
  }

  await UtilsDiscord.updateGuildsStatus(client);
};
