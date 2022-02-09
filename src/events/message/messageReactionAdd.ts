import Application from '../../components/Application/Application';
import { MessageReaction, User } from 'discord.js';
import { MessageReactionService } from '../../service/message/MessageReactionService';

/**
 * @param {Application} client
 * @param {MessageReaction} messageReaction
 * @param {User} user
 */
export default async (
  client: Application,
  messageReaction: MessageReaction,
  user: User
) => MessageReactionService.roleAddOrRemove(messageReaction, user, 'add');
