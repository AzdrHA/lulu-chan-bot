import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/appConfig';
import { Category } from '../../types/Category';

export default class Clear extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: Category;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  constructor(props) {
    super(props);

    this.alias = ['clear'];
    this.allowDM = true;
    this.category = 'admin';
    this.cooldown = 0;
    this.description = '';
    this.disable = false;
    this.example = '{prefix} clear';
    this.onlyDev = false;
  }

  execute(): Promise<Message> {
    return this.messageEmbed({
      description: this.translation('INVITE', {
        inviteLink: AppConfig.add_bot_link
      })
    });
  }
}
