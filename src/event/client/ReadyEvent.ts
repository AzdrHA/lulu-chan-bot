import { IEvent } from "../../interface/IEvent";
import { ClientEvents } from "discord.js";

export default class ReadyEvent implements IEvent {
	public name: keyof ClientEvents = "ready";

	public execute(): Promise<void> {
		console.log("Ready!");
		return Promise.resolve(undefined);
	}
}
