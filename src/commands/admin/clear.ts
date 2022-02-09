import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/AppConfig';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';

export default class Clear extends BaseCommand {
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

    this.alias = ['clear'];
    this.allowDM = true;
    this.category = 'admin';
    this.cooldown = 0;
    this.description = '';
    this.disable = false;
    this.example = '{prefix} clear';
    this.onlyDev = false;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> =>
    this.messageEmbed({
      description: this.translation('INVITE', {
        inviteLink: AppConfig.add_bot_link
      })
    });
}
