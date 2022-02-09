import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import { ImageService } from '../../service/image/ImageService';
import messages from '../../messages/emotes.json';
import { CommandConstructor } from '../../types/CommandConstructor';
import { commands } from '../../config/Constants';

export default class Emote extends BaseCommand {
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

    this.alias = commands.get('emote');
    this.allowDM = false;
    this.category = 'emote';
    this.cooldown = 2;
    this.description = '';
    this.disable = false;
    this.example = `{prefix} [${commands.get('emote').join('|')}]`;
    this.onlyDev = false;
    this.multipleCommand = true;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    let message: string = messages['gdgdgd'];
    message = message
      ? message[Math.floor(Math.random() * message.length)].replace(
          /{author}/,
          this.author.toString()
        )
      : '';

    return this.message.channel.send({
      embeds: [await ImageService.imageCommand(this, message as string)]
    });
  };
}
