import { type IEmbedBuilder } from '../interface/IEmbedBuilder'
import { type APIEmbedField, type EmbedBuilder } from 'discord.js'
import { commandList } from '../handler/CommandHandler'
import { ECommandCategory } from '../enum/ECommandCategory'
import DefaultEmbedBuilder from './DefaultEmbedBuilder'
import { INVITE_URL, POLICY_URL, SUPPORT_URL } from '../config/constant.config'

export class HelpCommandEmbedBuilder
  extends DefaultEmbedBuilder
  implements IEmbedBuilder {
  private readonly formatValue = (value: string): string => `\`${value}\``
  private readonly formatValues = (values: string[] | undefined = []): string =>
    values.map(this.formatValue).sort().join(', ')

  private readonly fields: APIEmbedField[] = [
    {
      name: '<:write:616957647509389324> Emotes',
      value: this.formatValues(commandList.get(ECommandCategory.EMOTES)),
      inline: false
    },
    // {
    //   name: '<:raphi:648949919801016350> Reactions',
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
      value: `[Discord server invitation](${SUPPORT_URL})`,
      inline: true
    },
    {
      name: 'Bot invitation',
      value:
        `[Bot invitation](${INVITE_URL})`,
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
      value: `[Privacy Policy](${POLICY_URL})`,
      inline: true
    }
  ]

  public build (): EmbedBuilder {
    return this.setDescription('Here is the list of available commands:').setFields(this.fields)
  }
}
