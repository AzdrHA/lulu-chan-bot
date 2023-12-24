import { IEvent } from "../../interface/IEvent";
import { ClientEvents, Events } from "discord.js";

export default class ReadyEvent implements IEvent {
	public name: keyof ClientEvents = Events.ClientReady;

	public execute(): Promise<void> {
		console.log("Ready!");
		return Promise.resolve(undefined);
	}
}
