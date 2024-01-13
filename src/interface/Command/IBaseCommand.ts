import { IEventBase } from "../IEventBase";
import { Interaction } from "discord.js";
import { ECommandCategory } from "../../enum/ECommandCategory";

export interface IBaseCommand extends IEventBase {
	name: string | string[];
	multiple?: boolean;
	description: string;
	category: ECommandCategory;
	execute(interaction: Interaction): Promise<unknown>;
}
