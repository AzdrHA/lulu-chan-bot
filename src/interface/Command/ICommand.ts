import { type ECommandCategory } from '../../enum/ECommandCategory'
import { type SlashCommandBuilder } from '@discordjs/builders'
import { type ChatInputCommandInteraction } from 'discord.js'

export interface ICommand {
  multiple?: boolean
  category: ECommandCategory
  config: SlashCommandBuilder
  disable?: boolean
  execute: (interaction: ChatInputCommandInteraction) => Promise<unknown>
}
