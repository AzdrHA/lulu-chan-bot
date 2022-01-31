import Application from '../../components/application/application';
import { MessageReaction, User } from 'discord.js';
import { MessageReactionService } from '../../service/message/MessageReactionService';

const messageReactionAdd = async (
  client: Application,
  messageReaction: MessageReaction,
  user: User
) => {
  await MessageReactionService.roleAddOrRemove(messageReaction, user, 'add');
};

export default messageReactionAdd;
