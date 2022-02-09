import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import { ImageService } from '../../service/image/ImageService';
import { CommandConstructor } from '../../types/CommandConstructor';
import { commands } from '../../config/Constants';

export default class Porn extends BaseCommand {
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

    this.alias = commands.get('porn');
    this.allowDM = false;
    this.category = 'porn';
    this.cooldown = 2;
    this.description = '';
    this.disable = false;
    this.example = `{prefix} [${commands.get('porn').join('|')}]`;
    this.onlyDev = false;
    this.multipleCommand = true;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => ImageService.nsfwCommand(this);
}
