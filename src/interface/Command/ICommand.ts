import { type ECommandCategory } from '../../enum/ECommandCategory'
import { type SlashCommandBuilder, type SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { type ChatInputCommandInteraction, type SlashCommandSubcommandsOnlyBuilder } from 'discord.js'

export interface ICommand {
  multiple?: boolean
  category: ECommandCategory
  config: SlashCommandBuilder | SlashCommandSubcommandBuilder | SlashCommandSubcommandsOnlyBuilder
  disable?: boolean
  execute: (interaction: ChatInputCommandInteraction) => Promise<unknown>
}
