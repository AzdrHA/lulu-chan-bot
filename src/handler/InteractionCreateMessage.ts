import { type IInteractionCreateEvent } from '../interface/IInteractionCreateEvent'
import CommandManager from '../manager/CommandManager'
import { COMMAND_LIST, IS_DEVELOPMENT } from '../config/constant.config'
import { type Interaction } from 'discord.js'
import EmbedBuilderManager from '../manager/EmbedBuilderManager'
import { CommandUsedLogEmbedBuilder } from '../embed/log/CommandUsedLogEmbedBuilder'

export default class InteractionCreateMessage
implements IInteractionCreateEvent {
  public async handle (interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return

    const command = COMMAND_LIST.get(interaction.commandName)
    if (command == null) return

    const commandManager = new CommandManager()
    void commandManager.handle(command, interaction).then(async () => {
      if (!IS_DEVELOPMENT) {
        const channel =
					await interaction.client.channels.fetch('949278454598205450')
        if (channel != null && channel.isTextBased()) {
          void channel.send({
            embeds: [
              new EmbedBuilderManager().handle(
                new CommandUsedLogEmbedBuilder(interaction)
              )
            ]
          })
        }
      }
    })
  }
}
