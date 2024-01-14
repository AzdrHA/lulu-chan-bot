import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from "../../handler/CommandHandler";
import { getImageByCommandName } from "../../api/imageRequest";
import { ECommandCategory } from "../../enum/ECommandCategory";
import EmbedBuilderManager from "../../manager/EmbedBuilderManager";
import { PornCommandEmbedBuilder } from "../../embed/PornCommandEmbedBuilder";
import { SlashCommandBuilder } from "@discordjs/builders";

export default class PornCommand implements IMultipleCommand {
	public config = new SlashCommandBuilder().setDescription("...").setNSFW(true);

	public names = commandList.get("Porn");
	public multiple = true;
	public category = ECommandCategory.PORN;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<unknown> {
		const request = await getImageByCommandName(interaction.commandName);
		return interaction.reply({
			embeds: [
				new EmbedBuilderManager().handle(new PornCommandEmbedBuilder(request)),
			],
		});
	}
}
