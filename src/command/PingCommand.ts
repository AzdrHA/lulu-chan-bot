import { ICommand } from "../interface/ICommand";
import { ChatInputCommandInteraction } from "discord.js";

export default class PingCommand implements ICommand {
	public name = "ping";
	public description = "Reply with Pong and a heart because I love you <3";

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<void> {
		await interaction.reply({
			content: "Ping! <3",
			ephemeral: true,
		});
	}
}
