import { type ICommand } from '../../interface/Command/ICommand'
import { type ChatInputCommandInteraction } from 'discord.js'
import { ECommandCategory } from '../../enum/ECommandCategory'
import EmbedBuilderManager from '../../manager/EmbedBuilderManager'
import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { AvatarCommandEmbedBuilder } from '../../embed/AvatarCommandEmbedBuilder'

export default class AvatarCommand implements ICommand {
  public config = new SlashCommandSubcommandBuilder()
    .setName('avatar')
    .setDescription('Display your avatar or the avatar of the user you mention')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want to display the avatar')
        .setRequired(false)
    )

  public category = ECommandCategory.MISC

  public async execute (
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const user = interaction.options.getUser('user', false) ?? interaction.user
    await interaction.reply({
      ephemeral: false,
      embeds: [new EmbedBuilderManager().handle(new AvatarCommandEmbedBuilder(user))]
    })
  }
}
