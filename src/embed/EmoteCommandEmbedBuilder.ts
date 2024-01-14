import { type EmbedBuilder } from 'discord.js'
import { type IEmbedBuilder } from '../interface/IEmbedBuilder'
import DefaultEmbedBuilder from './DefaultEmbedBuilder'
import type IImage from '../interface/IImage'

export class EmoteCommandEmbedBuilder
  extends DefaultEmbedBuilder
  implements IEmbedBuilder {
  private readonly image: IImage
  constructor (image: IImage) {
    super()
    this.image = image
  }

  public build (): EmbedBuilder {
    return this.setImage(this.image.image)
      .setFooter({ text: this.image.name })
      .setTimestamp()
  }
}
