import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import { ImageService } from '../../service/image/ImageService';
import messages from '../../messages/reactions.json';
import { CommandConstructor } from '../../types/CommandConstructor';
import { commands } from '../../config/Constants';
import UtilsStr from '../../utils/UtilsStr';

export default class Reaction extends BaseCommand {
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

    this.alias = commands.get('reaction');
    this.allowDM = false;
    this.category = 'reaction';
    this.cooldown = 2;
    this.description = '';
    this.disable = false;
    this.example = `{prefix} [${commands.get('reaction').join('|')}]`;
    this.onlyDev = false;
    this.multipleCommand = true;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    let message: string = messages[this.command];
    if (message) {
      message = message[this.memberItsMe() ? 'self' : 'mentioned'];
      if (!message) message = '';

      if (message) {
        message = UtilsStr.replace(
          message[Math.floor(Math.random() * message.length)],
          {
            author: this.author.toString(),
            member: this.member.toString()
          }
        );
      }
    }

    return this.message.channel.send({
      embeds: [await ImageService.imageCommand(this, message as string)]
    });
  };
}
