import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message } from 'discord.js';
import { commands } from '../../lib/constants';
import { makeRequest } from '../../api/makeRequest';

interface FetchImageError {
  response: { statusCode: number; message: string };
  status: number;
  message: string;
  name: string;
}

interface FetchImage extends Partial<FetchImageError> {
  name: string;
  url: string;
}

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
    this.description = 'Need description';
    this.disable = false;
    this.example = `{prefix} [${commands.get('emote').join('|')}]`;
    this.onlyDev = false;
    this.multipleCommand = true;
  }

  private fetchImage = (name: string) =>
    // ${process.env.API_URL}
    makeRequest(`http://api.lulu-chan.fun/api/v1/image/${name}`, 'GET');

  async execute(): Promise<Message> {
    const image: any = await this.fetchImage(this.command);
    console.log(image);
    if (image.status && image.status === 404)
      return this.messageEmbed({
        description: 'This command has no image yet',
        image: {
          url: 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
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
