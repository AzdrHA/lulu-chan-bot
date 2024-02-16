import { SlashCommandBuilder } from '@discordjs/builders'
import { ECommandCategory } from '../../enum/ECommandCategory'
import {
  BaseGuildTextChannel,
  type ChatInputCommandInteraction,
  type InteractionResponse,
  PermissionFlagsBits
} from 'discord.js'
import { type ICommand } from '../../interface/Command/ICommand'
import PermissionException from '../../exception/PermissionException'

export default class NsfwCommand implements ICommand {
  public config = new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('Change channel NSFW status')
    .setNSFW(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)

  public category = ECommandCategory.SETTINGS

  public async execute (
    interaction: ChatInputCommandInteraction
  ): Promise<InteractionResponse> {
    // check if the interaction is in a guild
    if (!interaction.inGuild()) {
      throw new PermissionException(
        'You can only change the NSFW status of a text channel'
      )
    }

    // check if the member has permission to change the NSFW status of the channel
    if (
      !interaction.memberPermissions?.has(PermissionFlagsBits.ManageChannels)
    ) {
      throw new PermissionException(
        'You do not have permission to change the NSFW status of this channel.'
      )
    }

    // check if the bot has permission to change the NSFW status of the channel
    if (
      interaction.guild?.members.cache
        .get(interaction.client.user.id)
        ?.permissions.has(PermissionFlagsBits.ManageChannels) === false
    ) {
      throw new PermissionException(
        'I do not have permission to change the NSFW status of this channel.'
      )
    }

    // check if the channel is a text channel
    const channel = interaction.channel
    if (!(channel instanceof BaseGuildTextChannel)) {
      throw new PermissionException(
        'You can only change the NSFW status of a text channel'
      )
    }
    await channel.setNSFW(!channel.nsfw)

    return await interaction.reply({
      content: `This channel is now ${channel.nsfw ? 'NSFW' : 'SFW'}`,
      ephemeral: true
    })
  }
}
