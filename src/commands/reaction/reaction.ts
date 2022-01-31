import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message, TextChannel } from 'discord.js';
import { commands } from '../../lib/constants';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { Image } from '../../types/Image';
import { AppConfig } from '../../config/appConfig';
import { Category } from '../../types/Category';

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
    if (!(this.message.channel instanceof TextChannel)) return;

    let member =
      this.message.mentions.members.first() ||
      this.message.guild.members.cache.get(this.args[0]);
    if (!member) member = this.message.guild.members.cache.get(this.author.id);

    const image = (await makeRequest(
      ApiConfig.get_image_by_command(this.command),
      'GET'
    )) as Image;

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

    if (image.status && image.status === 404)
      return this.errorMessage({
        description: this.translation('COMMAND_HAS_NOT_IMAGE'),
        image: {
          url: AppConfig.cdn_domain + '/utils/image-not-found.png'
        }
      });

    return this.messageEmbed({
      description: message as string,
      footer: {
        text: image.name
      },
      timestamp: new Date(),
      image: {
        url: image.url
      }
    });
  }
}
