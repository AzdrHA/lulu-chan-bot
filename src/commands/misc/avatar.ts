import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';

export default class Avatar extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: Category;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  private readonly size: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

  constructor(props) {
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

  execute(): Promise<Message> {
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
  }
}
