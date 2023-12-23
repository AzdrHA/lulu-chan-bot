import { ICommand } from "../interface/ICommand";

export default class PingCommand implements ICommand {
	public name = "help";
	public description = "Help!";

	public execute(): Promise<void> {
		return Promise.resolve(undefined);
	}
}
