import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from '../../handler/CommandHandler';
import { getImageByCommandName } from '../../api/imageRequest';
import { ECommandCategory } from '../../enum/ECommandCategory';

export default class EmoteCommand implements IMultipleCommand {
	public name = commandList.get('Emotes');
	public description = "Emotes command";
	public multiple = true;
	public category = ECommandCategory.EMOTES;

	public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const te = await getImageByCommandName(interaction.commandName);
		await interaction.reply(te.image);
		return Promise.resolve(undefined);
	}
}
