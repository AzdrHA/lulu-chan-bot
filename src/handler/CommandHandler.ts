import { type IEventHandler } from '../interface/IEventHandler'
import LoadFileHandler from './LoadFileHandler'
import { COMMAND_DIR, COMMAND_LIST, DISCORD_CLIENT_ID, DISCORD_TOKEN } from '../config/constant.config'
import { type ICommand } from '../interface/Command/ICommand'
import { REST } from 'discord.js'
import { Routes as SlashRoutes } from 'discord-api-types/v10'
import { type IMultipleCommand } from '../interface/Command/IMultipleCommand'
import { type ICommandHandler } from '../interface/Command/ICommandHandler'
import {
  type SharedNameAndDescription, SlashCommandBuilder
} from '@discordjs/builders'
import { getAllCategory } from '../api/categoryRequest'

export const commandList = new Map<string, string[]>([])

export default class CommandHandler
  extends LoadFileHandler
  implements IEventHandler, ICommandHandler {
  public registeredCommand: SharedNameAndDescription[] = []

  constructor () {
    super(COMMAND_DIR)
  }

  public isMultipleCommand (
    command: ICommand | IMultipleCommand
  ): command is IMultipleCommand {
    return 'multiple' in command
  }

  private loadCommand (handler: ICommand | IMultipleCommand): void {
    if (this.isMultipleCommand(handler)) {
      this.loadMultipleCommand(handler)
    } else {
      this.loadSingleCommand(handler)
    }
  }

  private loadMultipleCommand (handler: IMultipleCommand): void {
    console.log(`Loaded multiple command from ${handler.category} : ${handler.names.join(', ')}`
    )
    handler.names.forEach((name) => {
      if (COMMAND_LIST.has(name)) {
        console.log(`Command ${name} already exist`)
        return
      }

      COMMAND_LIST.set(name, handler)
      handler.config.setName(name)
      handler.config.setDescription(`Get a random ${name} image`)
      const slashCommand = new SlashCommandBuilder()
      Object.assign(slashCommand, handler.config)
      this.registeredCommand.push(slashCommand)
    })
  }

  private loadSingleCommand (handler: ICommand): void {
    console.log(`Loaded command ${handler.config.name}`)
    if (COMMAND_LIST.has(handler.config.name)) {
      console.log(`Command ${handler.config.name} already exist`)
      return
    }

    const commands = commandList.get(handler.category) ?? []
    commands.push(handler.config.name)

    commandList.set(handler.category, commands)
    COMMAND_LIST.set(handler.config.name, handler)
    this.registeredCommand.push(handler.config)
  }

  private async registerCommand (): Promise<void> {
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

    try {
      console.log('\nStarted refreshing application (/) commands. watch')

      await rest.put(
        SlashRoutes.applicationCommands(DISCORD_CLIENT_ID),
        { body: this.registeredCommand }
      )

      console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
      console.error(error)
    }
  }

  private async getCommandFromAPI (): Promise<void> {
    const categories = await getAllCategory()
    console.log('Fetching category command from API...')
    categories.forEach((category) => {
      console.log(`Loaded category ${category.name} with ${category.commands.length} commands`)
      const commands = category.commands.map((command) => command.name)
      commandList.set(category.name, commands)
    })
  }

  public async handle (): Promise<void> {
    await this.getCommandFromAPI()
    console.log('\nLoading command...')
    const handlers = await this.searchInFolder<ICommand | IMultipleCommand>()
    handlers.forEach((handler) => {
      if (handler.disable !== true) this.loadCommand(handler)
      else console.log(`Load canceled : ${handler.constructor.name} is disabled`)
    })
    await this.registerCommand()
  }
}
