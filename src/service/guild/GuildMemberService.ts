import Application from '../../components/Application/Application';
import { GuildMember, Message, TextChannel } from 'discord.js';
import { AppConfig } from '../../config/AppConfig';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import EmojiConfig from '../../config/EmojiConfig';

type MemberActionType = 'add' | 'remove';

export abstract class GuildMemberService {
  /**
   * @param {Application} client
   * @param {GuildMember} member
   * @param {MemberActionType} type
   * @return {Promise<Message>}
   */
  public static memberJoinOrLeave = async (
    client: Application,
    member: GuildMember,
    type: MemberActionType
  ): Promise<Message> => {
    if (member.guild.id !== AppConfig.luluchan_guild_id) return;
    await UtilsDiscord.updateMembersStatus(client);
    let typeData = { channel: '', message: '' };

    switch (type) {
      case 'add':
        typeData = {
          channel: AppConfig.channel.member_join,
          message: `${
            EmojiConfig.success
          } ${member.toString()} has joined! We are now ${
            member.guild.memberCount
          } members.`
        };
        break;
      case 'remove':
        typeData = {
          channel: AppConfig.channel.member_leave,
          message: `${
            EmojiConfig.denied
          } ${member.toString()} has left! We are now ${
            member.guild.memberCount
          } members.`
        };
        break;
    }

    const channel = await UtilsDiscord.getChannel(client, typeData.channel);
    if (!channel || !(channel instanceof TextChannel)) return;

    return channel.send(typeData.message);
  };
}
