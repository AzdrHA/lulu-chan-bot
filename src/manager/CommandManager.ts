import { ICommand } from "../interface/ICommand";
import { ChatInputCommandInteraction } from "discord.js";

export default class CommandManager {
	public async handle(
		command: ICommand,
		interaction: ChatInputCommandInteraction,
	): Promise<void> {
		await command.execute(interaction);
	}
}
