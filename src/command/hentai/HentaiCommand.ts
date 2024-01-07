import { IMultipleCommand } from "../../interface/Command/IMultipleCommand";
import { ChatInputCommandInteraction } from "discord.js";
import { commandList } from '../../handler/CommandHandler';
import { getImageByCommandName } from '../../api/imageRequest';
import { ECommandCategory } from '../../enum/ECommandCategory';

export default class HentaiCommand implements IMultipleCommand {
	public description = "Hentai command";
	public multiple = true;
	public name = commandList.get('Hentai');
	public category = ECommandCategory.HENTAI;

	public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const te = await getImageByCommandName(interaction.commandName);
		await interaction.reply(te.image);
		return Promise.resolve(undefined);
	}
}
