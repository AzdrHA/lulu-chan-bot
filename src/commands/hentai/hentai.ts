import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message } from 'discord.js';
import { commands } from '../../lib/constants';

export default class Hentai extends BaseCommand {
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

    this.alias = commands.get('hentai');
    this.allowDM = false;
    this.category = 'hentai';
    this.cooldown = 2;
    this.description = 'Need description';
    this.disable = false;
    this.example = `{prefix} [${commands.get('hentai').join('|')}]`;
    this.onlyDev = false;
    this.multipleCommand = true;
  }

  execute(): Promise<Message<boolean>> {
    throw new Error('Method not implemented.');
  }
}
