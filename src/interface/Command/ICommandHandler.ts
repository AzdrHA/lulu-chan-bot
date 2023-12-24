import { SharedNameAndDescription } from "@discordjs/builders";

export interface ICommandHandler {
	registeredCommand: SharedNameAndDescription[];
}
