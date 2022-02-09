import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message } from 'discord.js';
import { commands } from '../../lib/constants';
import { Category } from '../../types/Category';
import { ImageService } from '../../service/image/ImageService';
import messages from '../../messages/reactions.json';

export default class Reaction extends BaseCommand {
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

  async execute(): Promise<Message> {
    let message: string = messages[this.command];
    if (message) {
      message = message[this.memberItsMe() ? 'self' : 'mentioned'];
      if (!message) message = '';

      if (message) {
        message = message[Math.floor(Math.random() * message.length)];
        message = message.replace(/{author}/, this.author.toString());
        message = message.replace(/{member}/, this.member.toString());
      }
    }

    return this.message.channel.send({
      embeds: [await ImageService.imageCommand(this, message as string)]
    });
  }
}
