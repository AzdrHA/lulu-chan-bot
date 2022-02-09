import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/AppConfig';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';

export default class Invite extends BaseCommand {
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

    this.alias = ['support'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 0;
    this.description = this.translation('COMMAND_SUPPORT_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} support';
    this.onlyDev = false;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> =>
    this.messageEmbed({
      description: this.translation('SUPPORT', {
        inviteLink: AppConfig.support_invite
      })
    });
}
