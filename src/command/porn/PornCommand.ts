import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from "../../handler/CommandHandler";
import { getImageByCommandName } from "../../api/imageRequest";
import { ECommandCategory } from "../../enum/ECommandCategory";
import EmbedBuilderManager from "../../manager/EmbedBuilderManager";
import NoNSFWChannelEmbedBuilder from "../../embed/NoNSFWChannelEmbedBuilder";
import { PornCommandEmbedBuilder } from "../../embed/PornCommandEmbedBuilder";

export default class PornCommand implements IMultipleCommand {
	public description = "Porn command";
	public multiple = true;
	public name = commandList.get("Porn");
	public category = ECommandCategory.PORN;

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
				new EmbedBuilderManager().handle(new PornCommandEmbedBuilder(request)),
			],
		});
	}
}
