import { type ICommand } from '../../interface/Command/ICommand'
import { type ChatInputCommandInteraction } from 'discord.js'
import { ECommandCategory } from '../../enum/ECommandCategory'
import { SUPPORT_URL } from '../../config/constant.config'
import { SlashCommandBuilder } from '@discordjs/builders'

export default class SupportCommand implements ICommand {
  public config = new SlashCommandBuilder()
    .setName('support')
    .setDescription('Support server invitation')
    .setNSFW(false)

  public category = ECommandCategory.MISC

  public async execute (
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await interaction.reply({
      content: SUPPORT_URL,
      ephemeral: true
    })
  }
}
