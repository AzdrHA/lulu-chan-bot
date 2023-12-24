import { IEvent } from "../../interface/IEvent";
import { ClientEvents, Events, Interaction } from "discord.js";
import InteractionCreateManager from "../../manager/InteractionCreateManager";
import InteractionCreateMessage from "../../handler/InteractionCreateMessage";

export default class InteractionCreateEvent implements IEvent {
	public name: keyof ClientEvents = Events.InteractionCreate;

	public async execute(interaction: Interaction): Promise<void> {
		const interactionCreateManager = new InteractionCreateManager();
		await interactionCreateManager.handle(
			new InteractionCreateMessage(),
			interaction,
		);
	}
}
