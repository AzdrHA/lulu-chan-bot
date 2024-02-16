import { type ICommand } from '../../interface/Command/ICommand'
import { type ChatInputCommandInteraction } from 'discord.js'
import { ECommandCategory } from '../../enum/ECommandCategory'
import { SlashCommandBuilder } from '@discordjs/builders'
import EmbedBuilderManager from '../../manager/EmbedBuilderManager'
import InviteCommandEmbedBuilder from '../../embed/InviteCommandEmbedBuilder'

export default class InviteCommand implements ICommand {
  public config = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite me to your server!')
    .setNSFW(false)

  public category = ECommandCategory.MISC

  public async execute (
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await interaction.reply({
      embeds: [
        new EmbedBuilderManager().handle(new InviteCommandEmbedBuilder())
      ],
      ephemeral: true
    })
  }
}
