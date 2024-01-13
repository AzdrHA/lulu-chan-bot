import DefaultEmbedBuilder from "./DefaultEmbedBuilder";
import { IEmbedBuilder } from "../interface/IEmbedBuilder";
import { EmbedBuilder } from "discord.js";
import colorConfig from "../config/color.config";

export default class NoNSFWChannelEmbedBuilder
	extends DefaultEmbedBuilder
	implements IEmbedBuilder
{
	public build(): EmbedBuilder {
		return this.setDescription(
			":warning~2: This isn't a NSFW channel. You can switch it on, using Lulu's commands /nsfw or into discord channel settings!",
		).setColor(colorConfig.WARNING);
	}
}
