import { Client as BaseClient } from 'discord.js'

export default class Client<
	Ready extends boolean = boolean,
> extends BaseClient<Ready> {}
