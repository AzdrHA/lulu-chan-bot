import { IEventHandler } from "../interface/IEventHandler";
import Client from "../client";
import LoadFileHandler from "./LoadFileHandler";
import * as util from "util";
import { APP_DIR } from "../config/Constant";
import { ICommand } from "../interface/ICommand";
import { REST, Routes } from "discord.js";

export default class CommandHandler
	extends LoadFileHandler
	implements IEventHandler
{
	constructor(client: Client) {
		super(util.format("%s/%s", APP_DIR, "command"), client);
	}

	public async handle() {
		console.log("Loading command...");

		const command = [];
		const handlers = <ICommand[]>await this.searchInFolder();
		handlers.map((handler) => {
			console.log(`Loaded command ${handler.name}`);
			// this.client.commands.set(handler.name, handler);
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
				Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
				{ body: command },
			);

			console.log("Successfully reloaded application (/) commands.");
		} catch (error) {
			console.error(error);
		}

		console.log("Loaded command\n");
	}
}
