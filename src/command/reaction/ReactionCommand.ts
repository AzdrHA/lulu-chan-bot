import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from "../../handler/CommandHandler";
import { getImageByCommandName } from "../../api/imageRequest";
import { ECommandCategory } from "../../enum/ECommandCategory";
import EmbedBuilderManager from '../../manager/EmbedBuilderManager';
import { EmoteCommandEmbedBuilder } from '../../embed/EmoteCommandEmbedBuilder';

export default class ReactionCommand implements IMultipleCommand {
	public name = commandList.get('Reactions');
	public description = "...";
 public nsfw = false;
	public multiple = true;
	public category = ECommandCategory.REACTIONS;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<unknown> {
		const image = await getImageByCommandName(interaction.commandName);
		// todo add ReactionCommandEmbedBuilder
		return interaction.reply({
			embeds: [
				new EmbedBuilderManager().handle(new EmoteCommandEmbedBuilder(image)),
			],
		});
	}
}