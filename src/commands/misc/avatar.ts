import { BaseCommand, CategoryInterface } from '../../components/baseCommand';
import { Message } from 'discord.js';

export default class Avatar extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: CategoryInterface;
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
    this.cooldown = 3;
    this.description = 'Display his avatar or that of the member mentioned';
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
      let member =
        this.message.mentions.members.first() ||
        this.message.guild.members.cache.get(this.args[0]);
      if (!member)
        member = this.message.guild.members.cache.get(this.author.id);

      return this.messageEmbed({
        description: `[${
          member.displayName
        }'s avatar](${member.displayAvatarURL({
          size: this.size
        })})`,
        image: {
          url: member.displayAvatarURL({
            size: this.size
          })
        }
      });
    }
  }
}
