import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message, TextChannel } from 'discord.js';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';

export default class Nsfw extends BaseCommand {
  public alias: string[];
  public allowDM: boolean;
  public category: Category;
  public cooldown: number;
  public description: string;
  public disable: boolean;
  public example: string;
  public onlyDev: boolean;
  public multipleCommand: boolean;

  /**
   * @param {CommandConstructor} props
   */
  public constructor(props: CommandConstructor) {
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

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
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
  };
}
