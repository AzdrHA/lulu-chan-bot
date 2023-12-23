import { IEvent } from "../../interface/IEvent";
import { ClientEvents } from "discord.js";

export default class InteractionCreateEvent implements IEvent {
	public name: keyof ClientEvents = "interactionCreate";

	public async execute(interaction): Promise<void> {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === "help") {
			await interaction.reply("Pong!");
		}
		console.log("create!");
		return Promise.resolve(undefined);
	}
}
