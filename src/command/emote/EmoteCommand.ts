import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from "../../handler/CommandHandler";
import { getImageByCommandName } from "../../api/imageRequest";
import { ECommandCategory } from "../../enum/ECommandCategory";
import EmbedBuilderManager from "../../manager/EmbedBuilderManager";
import { EmoteCommandEmbedBuilder } from "../../embed/EmoteCommandEmbedBuilder";

export default class EmoteCommand implements IMultipleCommand {
	public name = commandList.get("Emotes");
	public description = "i'm a description";
	public multiple = true;
	public nsfw = false;
	public category = ECommandCategory.EMOTES;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<unknown> {
		const image = await getImageByCommandName(interaction.commandName);
		return interaction.reply({
			embeds: [
				new EmbedBuilderManager().handle(new EmoteCommandEmbedBuilder(image)),
			],
		});
	}
}
