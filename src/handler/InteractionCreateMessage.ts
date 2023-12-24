import { IInteractionCreateEvent } from "../interface/IInteractionCreateEvent";
import { ChatInputCommandInteraction } from "discord.js";
import CommandManager from "../manager/CommandManager";
import { COMMAND_LIST } from "../config/Constant";

export default class InteractionCreateMessage
	implements IInteractionCreateEvent
{
	public async handle(interaction: ChatInputCommandInteraction): Promise<void> {
		if (!interaction.isChatInputCommand()) return;

		const command = COMMAND_LIST.get(interaction.commandName);
		if (!command) return;

		const commandManager = new CommandManager();
		return await commandManager.handle(command, interaction);
	}
}
