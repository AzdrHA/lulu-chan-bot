import { type IInteractionCreateEvent } from '../interface/IInteractionCreateEvent'
import CommandManager from '../manager/CommandManager'
import { COMMAND_LIST } from '../config/constant.config'
import { type Interaction } from 'discord.js'

export default class InteractionCreateMessage
implements IInteractionCreateEvent {
  public async handle (interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return

    const command = COMMAND_LIST.get(interaction.commandName)
    if (command == null) return

    const commandManager = new CommandManager()
    await commandManager.handle(command, interaction)
  }
}
