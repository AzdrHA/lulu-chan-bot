import Application from '../../components/application/application';
import { MessageReaction, User } from 'discord.js';
import { MessageReactionService } from '../../service/message/MessageReactionService';

const messageReactionRemove = async (
  client: Application,
  messageReaction: MessageReaction,
  user: User
) => MessageReactionService.roleAddOrRemove(messageReaction, user, 'remove');

export default messageReactionRemove;
