import { IMultipleCommand } from "../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";

export default class EmotesCommand implements IMultipleCommand {
	description = "Emotes command";
	multiple = true;
	name = ["blush", "cry"];

	public execute(interaction: ChatInputCommandInteraction): Promise<void> {
		interaction.reply(interaction.commandName);
		return Promise.resolve(undefined);
	}
}
