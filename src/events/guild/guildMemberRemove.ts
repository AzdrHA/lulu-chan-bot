import Application from '../../components/application/application';
import { GuildMember } from 'discord.js';
import { GuildMemberService } from '../../service/guild/GuildMemberService';

/**
 * @param {Application} client
 * @param {GuildMember} member
 */
const guildMemberRemove = async (client: Application, member: GuildMember) =>
  GuildMemberService.memberJoinOrLeave(client, member, 'remove');

export default guildMemberRemove;
