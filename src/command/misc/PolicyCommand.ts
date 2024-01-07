import { ICommand } from "../../interface/Command/ICommand";
import { ChatInputCommandInteraction } from "discord.js";
import translatorManager from "../../manager/TranslatorManager";
import { ECommandCategory } from '../../enum/ECommandCategory';

export default class PolicyCommand implements ICommand {
	public name = "policy";
	public description = "Reply with Pong and a heart because I love you <3";
	public category = ECommandCategory.MISC;

	public async execute(
		interaction: ChatInputCommandInteraction,
	): Promise<void> {
		await interaction.reply({
			content: translatorManager.translate("https://lulu-chan.com/privacy-policy"),
			ephemeral: true,
		});
	}
}
