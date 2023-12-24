import { IEventHandler } from "../interface/IEventHandler";
import Client from "../client";
import LoadFileHandler from "./LoadFileHandler";
import { EVENT_DIR } from "../config/Constant";
import { IEvent } from "../interface/IEvent";

export default class EventHandler
	extends LoadFileHandler
	implements IEventHandler
{
	private readonly client: Client;

	public constructor(client: Client) {
		super(EVENT_DIR);
		this.client = client;
	}
	public async handle() {
		console.log("Loading events...");
		const handlers = await this.searchInFolder<IEvent>();
		handlers.map((handler) => {
			console.log(`Loaded event ${handler.name}`);
			this.client.on(handler.name, (...args) => handler.execute(...args));
		});
		console.log("Loaded events\n");
	}
}
