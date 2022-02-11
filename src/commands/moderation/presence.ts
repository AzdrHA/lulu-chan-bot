import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';

export default class Presence extends BaseCommand {
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

    this.alias = ['presence'];
    this.allowDM = true;
    this.category = 'moderation';
    this.cooldown = 0;
    this.description = '';
    this.disable = false;
    this.example = '{prefix} moderation';
    this.onlyDev = true;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    /* const type = this.args[0] ? this.args[0].toLowerCase() : null;

    switch (type) {
      case 'status':
        this.client.user.setPresence({
          status: 'idle',
          activities: [
            {
              name: 'Hello',
              type: 'PLAYING'
            }
          ]
        });
        break;
    }
*/
    return this.messageEmbed({
      description: 'wave'
    });
  };
}
