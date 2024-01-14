import { ICommand } from "../../interface/Command/ICommand";
import { ChatInputCommandInteraction } from "discord.js";
import { ECommandCategory } from "../../enum/ECommandCategory";
import { POLICY_URL } from "../../config/constant.config";
import { SlashCommandBuilder } from "@discordjs/builders";

export default class PolicyCommand implements ICommand {
	public config = new SlashCommandBuilder()
		.setName("policy")
		.setDescription(
			"Access our policies instantly for all the details you need.",
		)
		.setNSFW(false);

	public category = ECommandCategory.MISC;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<void> {
		await interaction.reply({
			content: POLICY_URL,
			ephemeral: true,
		});
	}
}
