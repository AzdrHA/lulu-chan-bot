import DefaultEmbedBuilder from '../DefaultEmbedBuilder'
import type { IEmbedBuilder } from '../../interface/IEmbedBuilder'
import { type ChatInputCommandInteraction, type EmbedBuilder } from 'discord.js'

export class CommandUsedLogEmbedBuilder extends DefaultEmbedBuilder implements IEmbedBuilder {
  constructor (private readonly interaction: ChatInputCommandInteraction) {
    super()
  }

  public build (): EmbedBuilder {
    return this.setDescription(this.interaction.commandName)
      .setAuthor({
        name: this.interaction.user.displayName,
        iconURL: this.interaction.user.avatarURL() ?? ' '
      })
      .setTimestamp().setFooter({
        text: this.interaction.user.id
      })
  }
}
