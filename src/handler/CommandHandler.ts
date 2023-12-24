import { IEventHandler } from "../interface/IEventHandler";
import LoadFileHandler from "./LoadFileHandler";
import { COMMAND_DIR, COMMAND_LIST } from "../config/Constant";
import { ICommand } from "../interface/Command/ICommand";
import { REST } from "discord.js";
import { Routes as SlashRoutes } from "discord-api-types/v10";
import { IMultipleCommand } from "../interface/Command/IMultipleCommand";
import { ICommandHandler } from "../interface/Command/ICommandHandler";
import { SharedNameAndDescription } from "@discordjs/builders";

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
		console.log(`Loaded multiple command ${handler.name}`);
		handler.name.map((name) => {
			if (COMMAND_LIST.has(name)) {
				console.log(`Command ${name} already exist`);
				return;
			}

			COMMAND_LIST.set(name, handler);
			this.registeredCommand.push(
				new SharedNameAndDescription()
					.setName(name)
					.setDescription(handler.description),
			);
		});
	}

	private loadSingleCommand(handler: ICommand) {
		console.log(`Loaded command ${handler.name}`);
		if (COMMAND_LIST.has(handler.name)) {
			console.log(`Command ${handler.name} already exist`);
			return;
		}

		COMMAND_LIST.set(handler.name, handler);
		this.registeredCommand.push(
			new SharedNameAndDescription()
				.setName(handler.name)
				.setDescription(handler.description),
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

	public async handle() {
		console.log("Loading command...");
		const handlers = await this.searchInFolder<ICommand | IMultipleCommand>();
		handlers.map((handler) => {
			this.loadCommand(handler);
		});

		await this.registerCommand();
	}
}
