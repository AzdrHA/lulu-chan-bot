import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message, TextChannel } from 'discord.js';
import { commands } from '../../lib/constants';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { Image } from '../../types/Image';
import { AppConfig } from '../../config/appConfig';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const messages = require('../../messages/emotes.json');

export default class Emote extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: CategoryInterface;
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
    if (!(this.message.channel instanceof TextChannel)) return;

    const image = (await makeRequest(
      ApiConfig.get_image_by_command(this.command),
      'GET'
    )) as Image;

    let message: string[] | string = messages[this.command];
    message = message
      ? message[Math.floor(Math.random() * message.length)].replace(
          /{author}/,
          this.author.toString()
        )
      : '';

    if (image.status && image.status === 404)
      return this.messageEmbed({
        description: this.translation('COMMAND_HAS_NOT_IMAGE'),
        image: {
          url: AppConfig.cdn_domain + '/utils/image-not-found.png'
        }
      });

    return this.messageEmbed({
      description: message,
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
