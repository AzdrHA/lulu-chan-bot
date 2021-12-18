import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message } from 'discord.js';
import { commands } from '../../lib/constants';

export default class Emote extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: CategoryInterface;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  constructor(props) {
    super(props);

    this.alias = commands.get('emote');
    this.allowDM = false;
    this.category = 'emote';
    this.cooldown = 2;
    this.description = 'Need description';
    this.disable = false;
    this.example = `{prefix} [${commands.get('emote').join('|')}]`;
    this.onlyDev = false;
    this.multipleCommand = true;
  }

  execute(): Promise<Message<boolean>> {
    throw new Error('Method not implemented.');
  }
}
