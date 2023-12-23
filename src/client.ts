import { Client as BaseClient } from "discord.js";
import { ICommand } from "./interface/ICommand";

export default class Client<Ready extends boolean> extends BaseClient<Ready> {
	public commands: Map<string, ICommand> = new Map();
}
