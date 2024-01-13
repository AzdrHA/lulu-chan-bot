import { EmbedBuilder } from "discord.js";
import { IEmbedBuilder } from "../interface/IEmbedBuilder";
import { Image } from "../model/Image";
import DefaultEmbedBuilder from "./DefaultEmbedBuilder";
import colorConfig from "../config/color.config";

export class PornCommandEmbedBuilder
	extends DefaultEmbedBuilder
	implements IEmbedBuilder
{
	private image: Image;

	constructor(image: Image) {
		super();
		this.image = image;
	}

	public build(): EmbedBuilder {
		return this.setImage(this.image.image)
			.setFooter({ text: this.image.name })
			.setTimestamp()
			.setColor(colorConfig.SEXY);
	}
}
