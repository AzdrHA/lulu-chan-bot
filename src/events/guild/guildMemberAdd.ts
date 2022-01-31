import Application from '../../components/application/application';
import { GuildMember, TextChannel } from 'discord.js';
import { AppConfig } from '../../config/appConfig';
import { UtilsDiscord } from '../../utils/utilsDiscord';

const guildMemberAdd = async (client: Application, member: GuildMember) => {
  if (member.guild.id !== AppConfig.luluchan_guild_id) return;
  await UtilsDiscord.updateMembersStatus(client);

  const channel = client.channels.cache.get(AppConfig.channel.member_join);
  if (channel && channel instanceof TextChannel) {
    await channel.send(
      `:yep: ${member.toString()} has joined! We are now ${
        member.guild.memberCount
      } members.`
    );
  }
};
export default guildMemberAdd;
