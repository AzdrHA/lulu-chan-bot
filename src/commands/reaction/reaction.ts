import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message } from 'discord.js';
import { commands } from '../../lib/constants';
import { Category } from '../../types/Category';
import { ImageService } from '../../service/image/ImageService';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const messages = require('../../messages/reactions.json');

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
    let member =
      this.message.mentions.members.first() ||
      this.message.guild.members.cache.get(this.args[0]);
    if (!member) member = this.message.guild.members.cache.get(this.author.id);

    let message: string[] | string = messages[this.command];
    if (message) {
      if (member.id !== this.author.id) message = message['mentioned'];
      else message = message['self'];

      if (message) {
        message = message[Math.floor(Math.random() * message.length)] as string;
        message = message.replace(/{author}/, this.author.toString());
        message = message.replace(/{member}/, member.toString());
      } else message = '';
    }

    return this.message.channel.send({
      embeds: [await ImageService.imageCommand(this, message as string)]
    });
  }
}
