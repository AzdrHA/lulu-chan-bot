import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { Image } from '../../types/Image';
import { AppConfig } from '../../config/appConfig';
import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

export type EmoteMessage = {
  [command: string]: string[];
};

export type ReactionMessage = {
  [command: string]: {
    self?: string[];
    mentioned: string[];
  };
};

export abstract class ImageService {
  public static nsfwCommand = async (data: BaseCommand): Promise<Message> => {
    if (!(data.message.channel instanceof TextChannel)) return;

    if (!data.message.channel.nsfw)
      return data.warningMessage({
        description: data.translation('NSFW_CHANNEL'),
        image: {
          url: AppConfig.cdn_domain + '/utils/not-nsfw-loading.gif'
        }
      });

    return data.message.channel.send({
      embeds: [await this.imageCommand(data)]
    });
  };

  public static imageCommand = async (
    data: BaseCommand,
    message?: string
  ): Promise<MessageEmbed> => {
    if (!(data.message.channel instanceof TextChannel)) return;

    const image = (await makeRequest(
      ApiConfig.get_image_by_command(data.command),
      'GET'
    )) as Image;

    if (image.status && image.status === 404)
      return data.embed({
        description: data.translation('COMMAND_HAS_NOT_IMAGE'),
        image: {
          url: AppConfig.cdn_domain + '/utils/image-not-found.png'
        }
      });

    return data.embed({
      description: message ?? '',
      footer: {
        text: image.name
      },
      timestamp: new Date(),
      image: {
        url: image.url
      }
    });
  };
}
