import { ICommand } from "../interface/Command/ICommand";
import { ChatInputCommandInteraction } from "discord.js";
import translatorManager from "../manager/TranslatorManager";

export default class PingCommand implements ICommand {
	public name = "ping";
	public description = "Reply with Pong and a heart because I love you <3";

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<void> {
		await interaction.reply({
			content: translatorManager.translate("Ping! <3"),
			ephemeral: true,
		});
	}
}
