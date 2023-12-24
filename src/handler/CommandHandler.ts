import { IEventHandler } from "../interface/IEventHandler";
import LoadFileHandler from "./LoadFileHandler";
import { COMMAND_DIR, COMMAND_LIST } from "../config/Constant";
import { ICommand } from "../interface/ICommand";
import { REST } from "discord.js";
import { Routes as SlashRoutes } from "discord-api-types/v10";

export default class CommandHandler
	extends LoadFileHandler
	implements IEventHandler
{
	constructor() {
		super(COMMAND_DIR);
	}

	public async handle() {
		console.log("Loading command...");

		const command = [];
		const handlers = await this.searchInFolder<ICommand>();
		handlers.map((handler) => {
			console.log(`Loaded command ${handler.name}`);

			if (COMMAND_LIST.has(handler.name)) {
				console.log(`Command ${handler.name} already exist`);
				return;
			}

			COMMAND_LIST.set(handler.name, handler);
			command.push({
				name: handler.name,
				description: handler.description,
			});
		});

		const rest = new REST({ version: "10" }).setToken(
			process.env.DISCORD_TOKEN,
		);

		try {
			console.log("Started refreshing application (/) commands. watch");

			await rest.put(
				SlashRoutes.applicationCommands(process.env.DISCORD_CLIENT_ID),
				{ body: command },
			);

			console.log("Successfully reloaded application (/) commands.");
		} catch (error) {
			console.error(error);
		}
		console.log("Loaded command\n");
	}
}
