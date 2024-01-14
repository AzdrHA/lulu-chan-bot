import { type Interaction } from 'discord.js'
import type InteractionCreateMessage from '../handler/InteractionCreateMessage'

export default class InteractionCreateManager {
  public async handle (
    event: InteractionCreateMessage,
    interaction: Interaction
  ): Promise<void> {
    await event.handle(interaction)
  }
}
