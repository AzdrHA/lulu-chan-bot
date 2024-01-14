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
		return Array.isArray(command.name);
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
			`Loaded multiple command from ${handler.category} : ${handler.name.join(
				", ",
			)}`,
		);
		handler.name.map((name) => {
			if (COMMAND_LIST.has(name)) {
				console.log(`Command ${name} already exist`);
				return;
			}

			COMMAND_LIST.set(name, handler);
			this.registeredCommand.push(
				new SlashCommandBuilder()
					.setName(name)
					.setDescription(handler.description)
					.setNSFW(handler.nsfw)
			);
		});
	}

	private loadSingleCommand(handler: ICommand) {
		console.log(`Loaded command ${handler.name}`);
		if (COMMAND_LIST.has(handler.name)) {
			console.log(`Command ${handler.name} already exist`);
			return;
		}

		const commands = commandList.get(handler.category) ?? [];
		commands.push(handler.name);
		commandList.set(handler.category, commands);

		COMMAND_LIST.set(handler.name, handler);
		this.registeredCommand.push(
			new SlashCommandBuilder()
				.setName(handler.name)
				.setDescription(handler.description)
				.setNSFW(handler.nsfw),
		);
	}

	private async registerCommand() {
		const rest = new REST({ version: "10" }).setToken(
			process.env.DISCORD_TOKEN,
		);

		try {
			console.log("Started refreshing application (/) commands. watch");

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
		console.log("Loading category command from API...");
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
		console.log("Loading command...");
		const handlers = await this.searchInFolder<ICommand | IMultipleCommand>();
		handlers.map((handler) => {
			this.loadCommand(handler);
		});

		await this.registerCommand();
	}
}
