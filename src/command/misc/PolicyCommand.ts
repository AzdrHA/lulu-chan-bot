import { ICommand } from "../../interface/Command/ICommand";
import { ChatInputCommandInteraction } from "discord.js";
import translatorManager from "../../manager/TranslatorManager";
import { ECommandCategory } from "../../enum/ECommandCategory";
import { POLICY_URL } from "../../config/constant.config";

export default class PolicyCommand implements ICommand {
	public name = "policy";
	public description = "Reply with Pong and a heart because I love you <3";
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
