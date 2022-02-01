import { Message, MessageReaction, User } from 'discord.js';
import { AppConfig } from '../../config/appConfig';

// TODO change to enum
type RoleReactionType = 'add' | 'remove';

export abstract class MessageReactionService {
  /**
   * @param {MessageReaction} messageReaction
   * @param {User} user
   * @param {RoleReactionType} type
   * @return {Promise<Message>}
   */
  public static roleAddOrRemove = async (
    messageReaction: MessageReaction,
    user: User,
    type: RoleReactionType
  ): Promise<Message> => {
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
            return member.send(`You have chosen the role **${role.name}**.`);
          case 'remove':
            await member.roles.remove(role);
            return member.send(`You have withdrawn the role **${role.name}**.`);
        }
      }
    }
  };
}
