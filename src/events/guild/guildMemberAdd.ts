import Application from '../../components/application/application';
import { GuildMember } from 'discord.js';
import { GuildMemberService } from '../../service/guild/GuildMemberService';

const guildMemberAdd = async (client: Application, member: GuildMember) => {
  return GuildMemberService.memberJoinOrLeave(client, member, 'add');
};
export default guildMemberAdd;
