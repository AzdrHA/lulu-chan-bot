import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';
import { blacklists, owners } from '../../config/Constants';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import translations from '../../components/Translations/Translations';
import { Blacklist as BlacklistType } from '../../types/Blacklist';
import axios from 'axios';

export default class UnBlacklist extends BaseCommand {
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

    this.alias = ['unblacklist'];
    this.allowDM = true;
    this.category = 'moderation';
    this.cooldown = 0;
    this.description = '';
    this.disable = false;
    this.example = '{prefix} unblacklist';
    this.onlyDev = true;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    const userId = this.args[0];

    if (!userId)
      return this.warningMessage({
        description: translations('USER_NOT_FOUND', {
          lang: 'en'
        })
      });

    try {
      const user =
        this.client.users.cache.get(userId) ??
        (await this.client.users.fetch(this.args[0]));

      if (!blacklists.get(user.id))
        return this.warningMessage({
          description: translations('USER_NOT_BLACKLIST', {
            lang: 'en',
            variables: {
              USER: user.toString()
            }
          })
        });

      makeRequest(ApiConfig.blacklist.remove(user.id), 'DELETE')
        .then(() => {
          if (blacklists.get(user.id)) blacklists.delete(user.id);
          return this.successMessage({
            description: translations('USER_UNBLACKLIST', {
              lang: 'en',
              variables: {
                USER: user.toString()
              }
            })
          });
        })
        .catch((e) => {
          return this.errorMessage({
            title: 'Error',
            description: e.response.data.error
          });
        });
    } catch (e) {
      if (e.code === 10013)
        return this.warningMessage({
          description: translations('USER_NOT_FOUND', {
            lang: 'en'
          })
        });
    }
  };
}
