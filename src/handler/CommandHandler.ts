import { IEventHandler } from "../interface/IEventHandler";
import LoadFileHandler from "./LoadFileHandler";
import { COMMAND_DIR, COMMAND_LIST } from "../config/constant.config";
import { ICommand } from "../interface/Command/ICommand";
import { REST } from "discord.js";
import { Routes as SlashRoutes } from "discord-api-types/v10";
import { IMultipleCommand } from "../interface/Command/IMultipleCommand";
import { ICommandHandler } from "../interface/Command/ICommandHandler";
import {
	SharedNameAndDescription,
	SlashCommandBuilder,
} from "@discordjs/builders";
import { getAllCategory } from "../api/categoryRequest";
export const commandList = new Map();

export default class CommandHandler
	extends LoadFileHandler
	implements IEventHandler, ICommandHandler
{
	public registeredCommand: SharedNameAndDescription[] = [];

	constructor() {
		super(COMMAND_DIR);
	}

	public isMultipleCommand(
		command: ICommand | IMultipleCommand,
	): command is IMultipleCommand {
		return "multiple" in command;
	}

	private loadCommand(handler: ICommand | IMultipleCommand) {
		if (this.isMultipleCommand(handler)) {
			this.loadMultipleCommand(handler);
		} else {
			this.loadSingleCommand(handler);
		}
	}

	private loadMultipleCommand(handler: IMultipleCommand) {
		console.log(
			`Loaded multiple command from ${handler.category} : ${handler.names.join(
				", ",
			)}`,
		);
		handler.names.map((name) => {
			if (COMMAND_LIST.has(name)) {
				console.log(`Command ${name} already exist`);
				return;
			}

			COMMAND_LIST.set(name, handler);
			handler.config.name = name;
			handler.config.description = `Get a random ${name} image`;
			const slashCommand = {
				...new SlashCommandBuilder(),
				...handler.config,
			};
			this.registeredCommand.push(slashCommand);
		});
	}

	private loadSingleCommand(handler: ICommand) {
		console.log(`Loaded command ${handler.config.name}`);
		if (COMMAND_LIST.has(handler.config.name)) {
			console.log(`Command ${handler.config.name} already exist`);
			return;
		}

		const commands = commandList.get(handler.category) ?? [];
		commands.push(handler.config.name);

		commandList.set(handler.category, commands);
		COMMAND_LIST.set(handler.config.name, handler);
		this.registeredCommand.push(handler.config);
	}

	private async registerCommand() {
		const rest = new REST({ version: "10" }).setToken(
			process.env.DISCORD_TOKEN,
		);

		try {
			console.log("\nStarted refreshing application (/) commands. watch");

			await rest.put(
				SlashRoutes.applicationCommands(process.env.DISCORD_CLIENT_ID),
				{ body: this.registeredCommand },
			);

			console.log("Successfully reloaded application (/) commands.");
		} catch (error) {
			console.error(error);
		}
	}

	private async getCommandFromAPI() {
		const categories = await getAllCategory();
		console.log("Fetching category command from API...");
		categories.map((category) => {
			console.log(
				`Loaded category ${category.name} with ${category.commands.length} commands`,
			);
			const commands = category.commands.map((command) => command.name);
			commandList.set(category.name, commands);
		});
	}

	public async handle() {
		await this.getCommandFromAPI();
		console.log("\nLoading command...");
		const handlers = await this.searchInFolder<ICommand | IMultipleCommand>();
		handlers.map((handler) => {
			this.loadCommand(handler);
		});
		// await this.registerCommand();
	}
}
