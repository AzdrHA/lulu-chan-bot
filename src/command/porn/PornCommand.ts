import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from '../../handler/CommandHandler';
import { getImageByCommandName } from '../../api/imageRequest';
import { ECommandCategory } from '../../enum/ECommandCategory';

export default class PornCommand implements IMultipleCommand {
	public description = "Porn command";
	public multiple = true;
	public name = commandList.get('Porn');
	public category = ECommandCategory.PORN;

	public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const te = await getImageByCommandName(interaction.commandName);
		await interaction.reply(te.image);
		return Promise.resolve(undefined);
	}
}
