import { IEventBase } from "./IEventBase";

export interface ICommand extends IEventBase {
	name: string;
	description: string;
}
