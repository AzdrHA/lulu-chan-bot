import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { HexColorString, Message, TextChannel } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { settings } from '../../lib/constants';
import color from '../../utils/color';
import UtilsRegex from '../../utils/utilsRegex';
import { UtilsDiscord } from '../../utils/utilsDiscord';

export default class Color extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: CategoryInterface;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  public constructor(props) {
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
      .then(() => {
        settings.get(this.message.guildId).color = color;
        return this.successMessage({
          description: this.translation('COLOR_CHANGED')
        });
      })
      .catch((e) => {
        UtilsDiscord.sendError(this.client, 'color', e.response.data);
        return this.errorMessage({
          description: this.translation('API_CHANGE_ERROR')
        });
      });

  public execute(): Promise<Message> {
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
      if (newColor === 'default') return this.saveColor(color.default_color);

      // Check first argument is given
      if (!newColor)
        return this.warningMessage({
          description: this.translation('COLOR_MISSING', {
            defaultColor: color.default_color
          })
        });

      if (!UtilsRegex.isHexColor(newColor))
        return this.warningMessage({
          description: this.translation('COLOR_INVALID')
        });

      // Check if the color is not equal to the current
      if (newColor === settings.get(this.message.guildId).color)
        return this.warningMessage({
          description: this.translation('NEW_COLOR_EQUAL_TO_CURRENT')
        });

      return this.saveColor(newColor as HexColorString);
    } catch (e) {
      UtilsDiscord.sendError(this.client, 'color', e);
    }
  }
}
