import Application from '../../components/application/application';
import { GuildMember, TextChannel } from 'discord.js';
import { AppConfig } from '../../config/appConfig';
import { UtilsDiscord } from '../../utils/utilsDiscord';
import emoji from '../../utils/emoji';

type MemberActionType = 'add' | 'remove';

export abstract class GuildMemberService {
  public static memberJoinOrLeave = async (
    client: Application,
    member: GuildMember,
    type: MemberActionType
  ) => {
    if (member.guild.id !== AppConfig.luluchan_guild_id) return;
    await UtilsDiscord.updateMembersStatus(client);
    let typeData = { channel: '', message: '' };

    switch (type) {
      case 'add':
        typeData = {
          channel: AppConfig.channel.member_join,
          message: `${
            emoji.success
          } ${member.toString()} has joined! We are now ${
            member.guild.memberCount
          } members.`
        };
        break;
      case 'remove':
        typeData = {
          channel: AppConfig.channel.member_leave,
          message: `${emoji.denied} ${member.toString()} has left! We are now ${
            member.guild.memberCount
          } members.`
        };
        break;
    }

    const channel =
      client.channels.cache.get(typeData.channel) ??
      (await client.channels.fetch(typeData.channel, { force: true }));
    if (channel.partial) await channel.fetch();

    if (channel && channel instanceof TextChannel)
      await channel.send(typeData.message);
  };
}
