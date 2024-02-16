import { type EmbedBuilder, type User } from 'discord.js'
import DefaultEmbedBuilder from './DefaultEmbedBuilder'
import { type IEmbedBuilder } from '../interface/IEmbedBuilder'

export class AvatarCommandEmbedBuilder
  extends DefaultEmbedBuilder
  implements IEmbedBuilder {
  public constructor (private readonly user: User) {
    super()
  }

  public build (): EmbedBuilder {
    return this.setDescription(
			`[${this.user.displayName}'s avatar](${this.user.avatarURL()})`
    ).setImage(this.user.displayAvatarURL({ size: 512 }))
  }
}
