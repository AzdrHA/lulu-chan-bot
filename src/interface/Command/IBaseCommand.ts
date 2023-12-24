import { IEventBase } from "../IEventBase";
import { Interaction } from "discord.js";

export interface IBaseCommand extends IEventBase {
	name: string | string[];
	multiple?: boolean;
	description: string;
	execute(interaction: Interaction): Promise<void>;
}
