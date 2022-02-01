import Application from '../../components/application/application';
import { MessageReaction, User } from 'discord.js';
import { MessageReactionService } from '../../service/message/MessageReactionService';

/**
 * @param {Application} client
 * @param {MessageReaction} messageReaction
 * @param {User} user
 */
const messageReactionAdd = async (
  client: Application,
  messageReaction: MessageReaction,
  user: User
) => MessageReactionService.roleAddOrRemove(messageReaction, user, 'add');

export default messageReactionAdd;
