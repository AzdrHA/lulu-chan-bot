import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message } from 'discord.js';
import { commands } from '../../lib/constants';
import { Category } from '../../types/Category';
import { ImageService } from '../../service/image/ImageService';
import messages from '../../messages/emotes.json';

export default class Emote extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: Category;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  constructor(props) {
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

  async execute(): Promise<Message> {
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
  }
}
