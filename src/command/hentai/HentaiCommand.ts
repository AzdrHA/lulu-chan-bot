import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from "../../handler/CommandHandler";
import { getImageByCommandName } from "../../api/imageRequest";
import { ECommandCategory } from "../../enum/ECommandCategory";
import NoNSFWChannelEmbedBuilder from "../../embed/NoNSFWChannelEmbedBuilder";
import EmbedBuilderManager from "../../manager/EmbedBuilderManager";
import { HentaiCommandEmbedBuilder } from "../../embed/HentaiCommandEmbedBuilder";

export default class HentaiCommand implements IMultipleCommand {
	public description = "Hentai command";
	public multiple = true;
	public name = commandList.get("Hentai");
	public category = ECommandCategory.HENTAI;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<unknown> {
		if (interaction.channel.nsfw === false)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					new EmbedBuilderManager().handle(new NoNSFWChannelEmbedBuilder()),
				],
			});

		const request = await getImageByCommandName(interaction.commandName);
		return interaction.reply({
			embeds: [
				new EmbedBuilderManager().handle(
					new HentaiCommandEmbedBuilder(request),
				),
			],
		});
	}
}
