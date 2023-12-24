import { IEventBase } from "./IEventBase";
import { Interaction } from "discord.js";

export interface ICommand extends IEventBase {
	name: string;
	description: string;
	execute(interaction: Interaction): Promise<void>;
}
