import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { EmbedFieldData, Message, TextChannel } from 'discord.js';
import { AppConfig } from '../../config/AppConfig';
import { Category } from '../../types/Category';
import { UtilsArray } from '../../utils/UtilsArray';
import { CommandConstructor } from '../../types/CommandConstructor';
import { commands } from '../../config/Constants';
import { commandConfig } from '../../config/CommandConfig';

export default class Help extends BaseCommand {
  public alias: string[];
  public allowDM: boolean;
  public category: Category;
  public cooldown: number;
  public description: string;
  public disable: boolean;
  public example: string;
  public onlyDev: boolean;
  public multipleCommand: boolean;

  /**
   * @param {CommandConstructor} props
   */
  public constructor(props: CommandConstructor) {
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

  helpTitle: Omit<Record<Category, string>, 'moderation'> = {
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
      if (commandConfig[category])
        fields[commandConfig[category].order] = {
          name: this.helpTitle[category],
          value: UtilsArray.join(commands, ', ', '`')
        };
    });
    return fields.reverse().sort();
  };

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
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
  };
}
