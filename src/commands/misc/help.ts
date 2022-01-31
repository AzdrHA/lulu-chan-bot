import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message, TextChannel } from 'discord.js';
import { commands } from '../../lib/constants';
import { AppConfig } from '../../config/appConfig';

export default class Help extends BaseCommand {
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

    this.alias = ['help'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 2;
    this.description = this.translation('COMMAND_HELP_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} help';
    this.onlyDev = false;
  }

  execute(): Promise<Message> {
    if (!(this.message.channel instanceof TextChannel)) return;
    return this.messageEmbed({
      fields: [
        {
          name: '<:write:616957647509389324> Emotes',
          value: commands
            .get('emote')
            .map((v) => '`' + v + '`')
            .join(',')
        },
        {
          name: '<:raphi:648949919801016350> Reactions',
          value: commands
            .get('reaction')
            .map((v) => '`' + v + '`')
            .join(',')
        },
        {
          name: ':underage: Nsfw Anime',
          value: commands
            .get('hentai')
            .map((v) => '`' + v + '`')
            .join(',')
        },
        {
          name: ':underage: Nsfw',
          value: commands
            .get('porn')
            .map((v) => '`' + v + '`')
            .join(',')
        },
        {
          name: ':file_folder: Misc',
          value: commands
            .get('misc')
            .map((v) => '`' + v + '`')
            .join(',')
        },
        {
          name: ':gear: Settings',
          value: commands
            .get('setting')
            .map((v) => '`' + v + '`')
            .join(',')
        },
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
      ]
    });
  }
}
