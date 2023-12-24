import { IBaseCommand } from "./IBaseCommand";

export interface IMultipleCommand extends IBaseCommand {
	name: string[];
	multiple: boolean;
}
