import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message, TextChannel } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';
import cache from '../../lib/cache';

export default class Prefix extends BaseCommand {
  public alias: string[];
  public allowDM: boolean;
  public category: Category;
  public cooldown: number;
  public description: string;
  public disable: boolean;
  public example: string;
  public onlyDev: boolean;
  public multipleCommand: boolean;

  private readonly prefix_max_length = 5;

  /**
   * @param {CommandConstructor} props
   */
  public constructor(props: CommandConstructor) {
    super(props);

    this.alias = ['prefix'];
    this.allowDM = false;
    this.category = 'setting';
    this.cooldown = 5;
    this.description = this.translation('COMMAND_PREFIX_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} prefix {prefix}';
    this.onlyDev = false;
  }

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

    const newPrefix = this.args[0];

    // Check first argument is given
    if (!newPrefix)
      return this.warningMessage({
        description: this.translation('PREFIX_MISSING')
      });

    // Check if the prefix is not equal to the current
    if (newPrefix === this.setting.prefix)
      return this.warningMessage({
        description: this.translation('NEW_PREFIX_EQUAL_TO_CURRENT')
      });

    // Check le len of prefix
    if (newPrefix.length > this.prefix_max_length)
      return this.warningMessage({
        description: this.translation('PREFIX_MAX_LENGTH'),
        footer: {
          text: this.translation('PREFIX_LENGTH', {
            MAX_LENGTH: this.prefix_max_length.toString()
          })
        }
      });

    makeRequest(
      ApiConfig.get_or_create_or_update_setting(this.message.guildId),
      'PUT',
      {
        prefix: newPrefix
      }
    )
      .then(async () => {
        await cache.setting.update(this.message.guildId, {
          prefix: newPrefix
        });
        return this.successMessage({
          description: this.translation('PREFIX_CHANGED')
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
