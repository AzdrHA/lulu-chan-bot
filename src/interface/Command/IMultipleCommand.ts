import { ICommand } from "./ICommand";

export interface IMultipleCommand extends ICommand {
	multiple: boolean;
	names: string[];
}
