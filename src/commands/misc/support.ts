import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/appConfig';

export default class Invite extends BaseCommand {
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

    this.alias = ['support'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 0;
    this.description = 'utils';
    this.disable = false;
    this.example = '{prefix} support';
    this.onlyDev = false;
  }

  execute(): Promise<Message> {
    return this.messageEmbed({
      description: this.translation('SUPPORT', {
        inviteLink: AppConfig.support_invite
      })
    });
  }
}
