import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message } from 'discord.js';

export default class Avatar extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: CategoryInterface;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  private readonly size: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

  constructor(props) {
    super(props);

    this.alias = ['avatar'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 1;
    this.description = 'Display his avatar or that of the member mentioned';
    this.disable = false;
    this.example = '{prefix} avatar [@member|ID]';
    this.onlyDev = false;

    this.size = 512;
  }

  execute(): Promise<Message<boolean>> {
    throw new Error('Method not implemented.');
  }
}
