import Application from '../../components/Application/Application';
import { GuildMember } from 'discord.js';
import { GuildMemberService } from '../../service/guild/GuildMemberService';

/**
 * @param {Application} client
 * @param {GuildMember} member
 */
export default async (client: Application, member: GuildMember) =>
  GuildMemberService.memberJoinOrLeave(client, member, 'remove');
