import { IEmbedBuilder } from "../interface/IEmbedBuilder";
import { EmbedBuilder } from "discord.js";

export default class EmbedBuilderManager {
	public handle(embed: IEmbedBuilder): EmbedBuilder {
		return embed.build();
	}
}
