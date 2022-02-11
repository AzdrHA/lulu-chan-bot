import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { HexColorString, Message, TextChannel } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import UtilsRegex from '../../utils/UtilsRegex';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import { Category } from '../../types/Category';
import ColorConfig from '../../config/ColorConfig';
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

    this.alias = ['color'];
    this.allowDM = false;
    this.category = 'setting';
    this.cooldown = 5;
    this.description = this.translation('COMMAND_COLOR_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} color {HexColor|default}';
    this.onlyDev = false;
  }

  private saveColor = (color: HexColorString) =>
    makeRequest(
      ApiConfig.get_or_create_or_update_setting(this.message.guildId),
      'PUT',
      {
        color: color
      }
    )
      .then(async () => {
        await cache.setting.update(this.message.guildId, { color });
        return this.successMessage({
          description: this.translation('COLOR_CHANGED')
        });
      })
      .catch(async (e) => {
        await UtilsDiscord.sendError(this.client, 'color', e.response.data);
        return this.errorMessage({
          description: this.translation('API_CHANGE_ERROR')
        });
      });

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    if (!(this.message.channel instanceof TextChannel)) return;

    try {
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

      const newColor = this.args[0];
      if (newColor === 'default')
        return this.saveColor(ColorConfig.default_color);

      // Check first argument is given
      if (!newColor)
        return this.warningMessage({
          description: this.translation('COLOR_MISSING', {
            DEFAULT_COLOR: ColorConfig.default_color
          })
        });

      if (!UtilsRegex.isHexColor(newColor))
        return this.warningMessage({
          description: this.translation('COLOR_INVALID')
        });

      // Check if the color is not equal to the current
      if (newColor === this.setting.color)
        return this.warningMessage({
          description: this.translation('NEW_COLOR_EQUAL_TO_CURRENT')
        });

      return this.saveColor(newColor as HexColorString);
    } catch (e) {
      await UtilsDiscord.sendError(this.client, 'color', e);
    }
  };
}
