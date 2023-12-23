import { ClientEvents } from "discord.js";
import { IEventBase } from "./IEventBase";

export interface IEvent extends IEventBase {
	name: keyof ClientEvents;
}
