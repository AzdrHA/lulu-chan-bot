import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message, TextChannel } from 'discord.js';

export default class Nsfw extends BaseCommand {
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

    this.alias = ['nsfw'];
    this.allowDM = true;
    this.category = 'setting';
    this.cooldown = 2;
    this.description = this.translation('COMMAND_NSFW_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} nsfw';
    this.onlyDev = false;
  }

  execute(): Promise<Message> {
    if (!(this.message.channel instanceof TextChannel)) return;

    // Check right permissions
    if (!this.message.member.permissions.has('MANAGE_CHANNELS'))
      return this.accessDenied({
        description: this.translation('BAD_PERMISSION'),
        footer: {
          text: this.translation('PERMISSION_REQUIRED', {
            PERMISSION: this.translation('MANAGE_CHANNELS')
          })
        }
      });

    if (this.message.channel.nsfw) {
      return this.message.channel.setNSFW(false).then(() =>
        this.successMessage({
          description: this.translation('NSFW_DISABLE')
        })
      );
    } else {
      return this.message.channel.setNSFW(true).then(() =>
        this.successMessage({
          description: this.translation('NSFW_ENABLED')
        })
      );
    }
  }
}
