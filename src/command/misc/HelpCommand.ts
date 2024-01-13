import { ICommand } from "../../interface/Command/ICommand";
import { ChatInputCommandInteraction } from "discord.js";
import { ECommandCategory } from "../../enum/ECommandCategory";
import EmbedBuilderManager from "../../manager/EmbedBuilderManager";
import { HelpCommandEmbedBuilder } from "../../embed/HelpCommandEmbedBuilder";

export default class PingCommand implements ICommand {
	public name = "help";
	public description = "Reply with Pong and a heart because I love you <3";
	public category = ECommandCategory.MISC;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<void> {
		await interaction.reply({
			ephemeral: false,
			embeds: [new EmbedBuilderManager().handle(new HelpCommandEmbedBuilder())],
		});
	}
}
