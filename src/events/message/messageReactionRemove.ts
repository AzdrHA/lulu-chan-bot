import Application from '../../components/Application/Application';
import { MessageReaction, User } from 'discord.js';
import { MessageReactionService } from '../../service/message/MessageReactionService';

export default async (
  client: Application,
  messageReaction: MessageReaction,
  user: User
) => MessageReactionService.roleAddOrRemove(messageReaction, user, 'remove');
