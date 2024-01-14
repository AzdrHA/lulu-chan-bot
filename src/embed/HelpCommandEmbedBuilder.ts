import { IEmbedBuilder } from '../interface/IEmbedBuilder';
import { APIEmbedField, EmbedBuilder } from 'discord.js';
import { commandList } from '../handler/CommandHandler';
import { ECommandCategory } from '../enum/ECommandCategory';
import DefaultEmbedBuilder from './DefaultEmbedBuilder';

export class HelpCommandEmbedBuilder
  extends DefaultEmbedBuilder
  implements IEmbedBuilder {
  private readonly formatValue = (value: string): string => `\`${value}\``;
  private readonly formatValues = (values: string[]): string =>
    values.map(this.formatValue).sort().join(', ');

  private readonly fields: APIEmbedField[] = [
    {
      name: ':write: Emotes',
      value: this.formatValues(commandList.get(ECommandCategory.EMOTES)),
      inline: false
    },
    // {
    //   name: ':raphi: Reactions',
    //   value: this.formatValues(commandList.get(ECommandCategory.REACTIONS)),
    //   inline: false
    // },
    {
      name: ':underage: Hentai',
      value: this.formatValues(commandList.get(ECommandCategory.HENTAI)),
      inline: false
    },
    {
      name: ':underage: Porn',
      value: this.formatValues(commandList.get(ECommandCategory.PORN)),
      inline: false
    },
    {
      name: ':file_folder: Misc',
      value: this.formatValues(commandList.get(ECommandCategory.MISC)),
      inline: false
    },

    {
      name: 'Support invitation',
      value: '[Discord server invitation](https://discord.gg/Jb6JwTd)',
      inline: true
    },
    {
      name: 'Bot invitation',
      value:
        '[Bot invitation](https://discord.com/oauth2/authorize?client_id=578907743122096148&permissions=842525950&scope=bot)',
      inline: true
    },

    {
      name: 'ㅤ',
      value: 'ㅤ'
    },

    {
      name: 'Terms of Service and Privacy Policy',
      value: '[Terms of Service](https://lulu-chan.com)',
      inline: true
    },
    {
      name: 'ㅤ',
      value: '[Privacy Policy](https://lulu-chan.com/privacy-policy)',
      inline: true
    }
  ];

  public build(): EmbedBuilder {
    return this.setDescription('Here is the list of available commands:').setFields(this.fields);
  }
}
