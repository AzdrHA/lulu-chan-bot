import { IntentsBitField } from "discord.js";
import Client from "./client";
import EventManager from "./manager/EventManager";
import EventHandler from "./handler/EventHandler";
import CommandHandler from "./handler/CommandHandler";

const client = new Client<false>({
	intents: [IntentsBitField.Flags.Guilds],
});

const eventManager = new EventManager();
await eventManager.handle(new EventHandler(client));
await eventManager.handle(new CommandHandler(client));

await client.login(process.env.DISCORD_TOKEN);
