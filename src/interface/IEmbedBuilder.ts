import { type EmbedBuilder } from 'discord.js'

export interface IEmbedBuilder {
  build: () => EmbedBuilder
}
