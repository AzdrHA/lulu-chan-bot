import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message, TextChannel } from 'discord.js';
import { commands } from '../../lib/constants';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { Image } from '../../types/Image';
import { AppConfig } from '../../config/appConfig';
import { Category } from '../../types/Category';

export default class Porn extends BaseCommand {
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

  async execute(): Promise<Message> {
    if (!(this.message.channel instanceof TextChannel)) return;

    if (!this.message.channel.nsfw)
      return this.warningMessage({
        description: this.translation('NSFW_CHANNEL'),
        image: {
          url: AppConfig.cdn_domain + '/utils/not-nsfw-loading.gif'
        }
      });

    const image = (await makeRequest(
      ApiConfig.get_image_by_command(this.command),
      'GET'
    )) as Image;

    if (image.status && image.status === 404)
      return this.messageEmbed({
        description: this.translation('COMMAND_HAS_NOT_IMAGE'),
        image: {
          url: AppConfig.cdn_domain + '/utils/image-not-found.png'
        }
      });

    return this.messageEmbed({
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
