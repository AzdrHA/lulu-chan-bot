import { MessageReaction, User } from 'discord.js';
import { AppConfig } from '../../config/appConfig';

type RoleReactionType = 'add' | 'remove';

export abstract class MessageReactionService {
  public static roleAddOrRemove = async (
    messageReaction: MessageReaction,
    user: User,
    type: RoleReactionType
  ) => {
    if (messageReaction.message.id === AppConfig.roles.team.message) {
      if (messageReaction.message.partial)
        await messageReaction.message.fetch();
      if (messageReaction.partial) await messageReaction.fetch();

      const data = AppConfig.roles.team.roles.find(
        (data) => data.name === messageReaction.emoji.name
      );
      if (!data) return;

      const guild = messageReaction.message.guild;
      const role =
        guild.roles.cache.get(data.role) ??
        (await guild.roles.fetch(data.role));

      const member =
        guild.members.cache.get(user.id) ??
        (await guild.members.fetch({ user: user }));

      if (role && member) {
        switch (type) {
          case 'add':
            await member.roles.add(role);
            await member.send(`You have chosen the role **${role.name}**.`);
            break;
          case 'remove':
            await member.roles.remove(role);
            await member.send(`You have withdrawn the role **${role.name}**.`);
        }
      }
    }
  };
}
