import { type IEmbedBuilder } from '../interface/IEmbedBuilder'
import { type EmbedBuilder } from 'discord.js'

export default class EmbedBuilderManager {
  public handle (embed: IEmbedBuilder): EmbedBuilder {
    return embed.build()
  }
}
