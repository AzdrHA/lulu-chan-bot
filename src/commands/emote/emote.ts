import {
  BaseCommand,
  BaseCommandType,
  CategoryInterface
} from '../../components/baseCommand';
import { Message } from 'discord.js';

export default class Emote extends BaseCommand implements BaseCommandType {
  alias: string[];
  allowDM: boolean;
  category: CategoryInterface;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;

  execute(): Promise<Message> {
    return Promise.resolve(undefined);
  }
}
