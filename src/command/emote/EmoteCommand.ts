import { type IMultipleCommand } from '../../interface/Command/IMultipleCommand'
import { type ChatInputCommandInteraction } from 'discord.js'
import { commandList } from '../../handler/CommandHandler'
import { getImageByCommandName } from '../../api/imageRequest'
import { ECommandCategory } from '../../enum/ECommandCategory'
import EmbedBuilderManager from '../../manager/EmbedBuilderManager'
import { EmoteCommandEmbedBuilder } from '../../embed/EmoteCommandEmbedBuilder'
import { SlashCommandBuilder } from '@discordjs/builders'

export default class EmoteCommand implements IMultipleCommand {
  public config = new SlashCommandBuilder()
    .setDescription('...')
    .setNSFW(false)

  public names = commandList.get(ECommandCategory.EMOTES) ?? []
  public multiple = true
  public category = ECommandCategory.EMOTES

  public async execute (
    interaction: ChatInputCommandInteraction
  ): Promise<unknown> {
    const image = await getImageByCommandName(interaction.commandName)
    return await interaction.reply({
      embeds: [
        new EmbedBuilderManager().handle(new EmoteCommandEmbedBuilder(image))
      ]
    })
  }
}
