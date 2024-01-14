import { ClientEvents } from "discord.js";

export interface IEvent {
	name: keyof ClientEvents;
	execute(...args: unknown[]): Promise<void>;
}
