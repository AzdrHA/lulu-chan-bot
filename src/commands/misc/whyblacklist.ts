import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { GuildMember, Message, MessageMentions } from 'discord.js';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';
import { blacklists } from '../../config/Constants';

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

    this.alias = ['whyblacklist'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 0;
    this.description = '';
    this.disable = false;
    this.example = '{prefix} whyblacklist';
    this.onlyDev = false;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    if (this.memberItsMe()) {
      if (blacklists.get(this.author.id)) {
        return this.messageEmbed({
          description: `You are blacklist for ${
            blacklists.get(this.author.id).reason
          }`
        });
      } else {
        return this.messageEmbed({
          description: 'You are not blacklist.'
        });
      }
    } else {
      if (blacklists.get(this.member.id)) {
        return this.messageEmbed({
          description: `${this.member.toString()} are blacklist for **${
            blacklists.get(this.member.id).reason
          }**`
        });
      } else {
        return this.messageEmbed({
          description: `${this.member.toString()} are not blacklist`
        });
      }
    }
  };
}
