import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import { CommandConstructor } from '../../types/CommandConstructor';

export default class Avatar extends BaseCommand {
  public alias: string[];
  public allowDM: boolean;
  public category: Category;
  public cooldown: number;
  public description: string;
  public disable: boolean;
  public example: string;
  public onlyDev: boolean;
  public multipleCommand: boolean;

  private readonly size: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

  /**
   * @param {CommandConstructor} props
   */
  public constructor(props: CommandConstructor) {
    super(props);

    this.alias = ['avatar'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 2;
    this.description = this.translation('COMMAND_AVATAR_DESCRIPTION');
    this.disable = false;
    this.example = '{prefix} avatar [@member|ID]';
    this.onlyDev = false;

    this.size = 512;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    if (this.message.channel.type === 'DM') {
      return this.messageEmbed({
        description: `[Your avatar!](https://cdn.discordapp.com/avatars/${this.author.id}/${this.author.avatar}.png?size=${this.size})`,
        image: {
          url: `https://cdn.discordapp.com/avatars/${this.author.id}/${this.author.avatar}?size=${this.size}`
        }
      });
    } else {
      return this.messageEmbed({
        description: `[${
          this.member.displayName
        }'s avatar](${this.member.displayAvatarURL({
          size: this.size,
          format: 'png'
        })})`,
        image: {
          url: this.member.displayAvatarURL({
            size: this.size,
            format: 'png'
          })
        }
      });
    }
  };
}
