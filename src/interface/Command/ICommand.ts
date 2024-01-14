import { ECommandCategory } from "../../enum/ECommandCategory";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "discord.js";

export interface ICommand {
	multiple?: boolean;
	category: ECommandCategory;
	config: SlashCommandBuilder;
	execute(interaction: Interaction): Promise<unknown>;
}
