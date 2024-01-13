import { EmbedBuilder } from "discord.js";
import colorConfig from "../config/color.config";

export default class DefaultEmbedBuilder extends EmbedBuilder {
	constructor() {
		super();
		this.setColor(colorConfig.DEFAULT);
	}
}
