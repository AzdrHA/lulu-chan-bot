/*
import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from "../../handler/CommandHandler";
import { getImageByCommandName } from "../../api/imageRequest";
import { ECommandCategory } from "../../enum/ECommandCategory";
import EmbedBuilderManager from "../../manager/EmbedBuilderManager";
import { SlashCommandBuilder } from "@discordjs/builders";
import { ReactionCommandEmbedBuilder } from '../../embed/ReactionCommandEmbedBuilder';

export default class ReactionCommand implements IMultipleCommand {
	public config = new SlashCommandBuilder()
		.setDescription("...")
		.setNSFW(false);

	public names = commandList.get("Reactions");
	public multiple = true;
	public category = ECommandCategory.REACTIONS;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<unknown> {
		const image = await getImageByCommandName(interaction.commandName);
		return interaction.reply({
			embeds: [
				new EmbedBuilderManager().handle(new ReactionCommandEmbedBuilder(image)),
			],
		});
	}
}
*/
