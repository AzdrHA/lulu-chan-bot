import { IEventHandler } from "../interface/IEventHandler";
import Client from "../client";
import LoadFileHandler from "./LoadFileHandler";
import * as util from "util";
import { APP_DIR } from "../config/Constant";
import { IEvent } from "../interface/IEvent";

export default class EventHandler
	extends LoadFileHandler
	implements IEventHandler
{
	constructor(client: Client) {
		super(util.format("%s/%s", APP_DIR, "event"), client);
	}
	public async handle() {
		console.log("Loading events...");
		const handlers = <IEvent[]>await this.searchInFolder();
		handlers.map((handler) => {
			console.log(`Loaded event ${handler.name}`);
			this.client.on(handler.name, (...args) => handler.execute(...args));
		});
		console.log("Loaded events\n");
	}
}
