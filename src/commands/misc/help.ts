import { BaseCommand } from '../../components/baseCommand/baseCommand';
import {
  CategoryChannel,
  EmbedFieldData,
  Message,
  TextChannel
} from 'discord.js';
import { commands } from '../../lib/constants';
import { AppConfig } from '../../config/appConfig';
import { Category } from '../../types/Category';
import { UtilsArray } from '../../utils/utilsArray';

export default class Help extends BaseCommand {
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

    this.alias = ['help'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 2;
    this.description = this.translation('COMMAND_HELP_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} help';
    this.onlyDev = false;
  }

  helpTitle: Record<Category, string> = {
    admin: '🔨 Administrator',
    image: '🖼 Images',
    music: '🎵 Musics',
    emote: '<:write:616957647509389324> Emotes',
    reaction: '<:raphi:648949919801016350> Reactions',
    porn: ':underage: Nsfw Anime',
    hentai: ':underage: Nsfw',
    misc: ':file_folder: Misc',
    setting: ':gear: Settings'
  };

  private getBody = () => {
    const fields: EmbedFieldData[] = [];
    commands.forEach((commands, category) => {
      fields.push({
        name: this.helpTitle[category],
        value: UtilsArray.join(commands, ', ', '`')
      });
    });
    return fields;
  };

  execute(): Promise<Message> {
    if (!(this.message.channel instanceof TextChannel)) return;
    return this.messageEmbed({
      fields: this.getBody().concat(
        {
          name: this.translation('SUPPORT_INVITATION'),
          value: this.translation('DISCORD_SERVER_INVITATION', {
            LINK: AppConfig.support_invite
          }),
          inline: true
        },
        {
          name: this.translation('INVITE_TITLE'),
          value: this.translation('BOT_INVITATION', {
            link: AppConfig.add_bot_link
          }),
          inline: true
        }
      )
    });
  }
}
