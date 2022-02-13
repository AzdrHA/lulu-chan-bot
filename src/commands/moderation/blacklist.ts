import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';
import { blacklists, owners } from '../../config/Constants';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import translations from '../../components/Translations/Translations';
import { Blacklist as BlacklistType } from '../../types/Blacklist';

export default class Blacklist extends BaseCommand {
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

    this.alias = ['blacklist'];
    this.allowDM = true;
    this.category = 'moderation';
    this.cooldown = 0;
    this.description = '';
    this.disable = false;
    this.example = '{prefix} blacklist';
    this.onlyDev = true;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    const userId = this.args[0];

    if (!userId)
      return this.warningMessage({
        description: 'Userid'
      });

    try {
      const user =
        this.client.users.cache.get(userId) ??
        (await this.client.users.fetch(this.args[0]));

      // Checks if the user is not a OWNER
      if (owners.has(user.id))
        return this.warningMessage({
          description: translations('CANT_BLACKLIST_THIS_USER', {
            lang: 'en'
          })
        });

      // Checks if user is not blacklist
      if (blacklists.get(user.id))
        return this.errorMessage({
          description: translations('ALREADY_BLACKLIST', {
            lang: 'en',
            variables: {
              REASON: blacklists.get(user.id).reason
            }
          })
        });

      const reason = this.args.slice(1).join(' ');
      if (!reason.length)
        return this.warningMessage({
          description: translations('BLACKLIST_REASON_MISSING', {
            lang: 'en'
          })
        });

      if (reason.length < 1 || reason.length > 256)
        return this.warningMessage({
          description: translations('REASON_LENGTH', {
            lang: 'en'
          })
        });

      makeRequest(ApiConfig.blacklist_user, 'POST', {
        user: user.id,
        moderator: this.author.id,
        reason: reason
      })
        .then(async (blacklist: BlacklistType) => {
          console.log(blacklist);
          await this.adminLogMessage(
            translations('USER_BLACKLISTED_LOG', {
              lang: 'en',
              variables: {
                USER: user.toString(),
                MODERATOR: this.author.toString(),
                REASON: reason
              }
            }),
            {
              fields: [
                {
                  name: translations('MODERATOR', {
                    lang: 'en'
                  }),
                  value: `${this.author.toString()} | ${
                    this.author.username + '#' + this.author.discriminator
                  } | ${this.author.id}`
                },
                {
                  name: translations('SANCTIONED', {
                    lang: 'en'
                  }),
                  value: `${user.toString()} | ${
                    user.username + '#' + user.discriminator
                  } | ${user.id}`
                }
              ]
            }
          );

          blacklists.set(user.id, blacklist);
          return this.successMessage({
            description: translations('USER_BLACKLISTED', {
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
