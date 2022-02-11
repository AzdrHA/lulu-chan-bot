import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message, TextChannel } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import { AppLanguage } from '../../config/AppLanguage';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';
import cache from '../../lib/cache';

export default class Color extends BaseCommand {
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

    this.alias = ['lang'];
    this.allowDM = false;
    this.category = 'setting';
    this.cooldown = 5;
    this.description = this.translation('COMMAND_LANGUAGE_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} lang {en|fr}';
    this.onlyDev = false;
  }

  public getLanguageList = (): Promise<Message> => {
    let list = '';
    for (const key of Object.keys(AppLanguage)) {
      if (AppLanguage.hasOwnProperty(key)) {
        const { id, flag, lang } = AppLanguage[key];
        list += `${flag} • \`\`${id}\`\` • ${lang}\n`;
      }
    }

    return this.messageEmbed({
      title: this.translation('LANG_LIST_AVAILABLE'),
      description: list,
      footer: {
        text: this.translation('LANG_LIST_FOOTER')
      }
    });
  };

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    if (!(this.message.channel instanceof TextChannel)) return;

    // Check right permissions
    if (!this.message.member.permissions.has('MANAGE_GUILD'))
      return this.accessDenied({
        description: this.translation('BAD_PERMISSION'),
        footer: {
          text: this.translation('PERMISSION_REQUIRED', {
            PERMISSION: this.translation('MANAGE_GUILD')
          })
        }
      });

    const newLang = this.args[0];

    if (!newLang) return this.getLanguageList();
    const langKey = newLang.toLowerCase();

    if (!AppLanguage[langKey])
      return this.warningMessage({
        description: this.translation('LANG_BAD_KEY')
      });

    if (langKey === this.setting.language)
      return this.warningMessage({
        description: this.translation('NEW_LANG_EQUAL_TO_CURRENT')
      });

    makeRequest(
      ApiConfig.get_or_create_or_update_setting(this.message.guildId),
      'PUT',
      {
        language: newLang
      }
    )
      .then(async () => {
        await cache.setting.update(this.message.guildId, {
          language: newLang
        });
        return this.successMessage({
          description: this.translation('LANG_CHANGED')
        });
      })
      .catch(async (e) => {
        await UtilsDiscord.sendError(this.client, 'color', e.response.data);
        return this.errorMessage({
          description: this.translation('API_CHANGE_ERROR')
        });
      });
  };
}
