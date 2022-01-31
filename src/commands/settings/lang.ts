import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message, TextChannel } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { settings } from '../../lib/constants';
import { AppLanguage } from '../../config/appLanguage';
import { UtilsDiscord } from '../../utils/utilsDiscord';
import { Category } from '../../types/Category';

export default class Color extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: Category;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  public constructor(props) {
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

  public execute(): Promise<Message> {
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
      .then(() => {
        settings.get(this.message.guildId).language = newLang;
        return this.successMessage({
          description: this.translation('LANG_CHANGED')
        });
      })
      .catch((e) => {
        UtilsDiscord.sendError(this.client, 'color', e.response.data);
        return this.errorMessage({
          description: this.translation('API_CHANGE_ERROR')
        });
      });
  }
}
