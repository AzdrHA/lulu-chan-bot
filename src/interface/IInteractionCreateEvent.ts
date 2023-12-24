import { Interaction } from "discord.js";

export interface IInteractionCreateEvent {
	handle(interaction: Interaction): Promise<void>;
}
