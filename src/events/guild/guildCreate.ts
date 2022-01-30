import Application from '../../components/application/application';
import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import color from '../../utils/color';
import { AppConfig } from '../../config/appConfig';
import { UtilsDiscord } from '../../utils/utilsDiscord';

const guildCreate = async (client: Application, guild: Guild) => {
  const embed = new MessageEmbed({
    author: {
      name: `${client.user.tag} a été ajouté au serveur!`,
      iconURL: client.user.avatarURL()
    },
    description: `Nom du serveur: ${guild.name}`,
    color: color.success,
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

  const channel = client.channels.cache.get(AppConfig.log_add_bot_channel);
  if (channel && channel instanceof TextChannel) {
    if (!AppConfig.development) await channel.send({ embeds: [embed] });
  }

  await UtilsDiscord.updateGuildsStatus(client);
};
export default guildCreate;
