import Application from '../../components/application/application';
import { GuildMember } from 'discord.js';
import { GuildMemberService } from '../../service/guild/GuildMemberService';

/**
 * @param {Application} client
 * @param {GuildMember} member
 */
const guildMemberAdd = async (client: Application, member: GuildMember) =>
  GuildMemberService.memberJoinOrLeave(client, member, 'add');
export default guildMemberAdd;
