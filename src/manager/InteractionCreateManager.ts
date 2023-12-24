import InteractionCreateMessage from "../handler/InteractionCreateMessage";

export default class InteractionCreateManager {
	public async handle(
		event: InteractionCreateMessage,
		interaction,
	): Promise<void> {
		await event.handle(interaction);
	}
}
