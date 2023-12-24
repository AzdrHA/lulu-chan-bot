import { Client as BaseClient } from "discord.js";

export default class Client<Ready extends boolean> extends BaseClient<Ready> {}
