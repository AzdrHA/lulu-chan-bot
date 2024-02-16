import { type ICommand } from '../interface/Command/ICommand'
import { type ChatInputCommandInteraction } from 'discord.js'
import PermissionException from '../exception/PermissionException'

export default class CommandManager {
  public async handle (
    command: ICommand,
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    try {
      await command.execute(interaction)
    } catch (error) {
      if (error instanceof PermissionException) {
        await interaction.reply({
          content: error.message,
          ephemeral: true
        })
      } else {
        await interaction.reply({
          content: 'An error has occurred.',
          ephemeral: true
        })
      }
    }
  }
}
