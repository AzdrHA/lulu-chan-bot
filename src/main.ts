import { IntentsBitField } from 'discord.js'
import Client from './client'
import EventManager from './manager/EventManager'
import EventHandler from './handler/EventHandler'
import CommandHandler from './handler/CommandHandler'

void (async () => {
  const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
  })

  const eventManager = new EventManager()
  await eventManager.handle(new EventHandler(client))
  await eventManager.handle(new CommandHandler())

  await client.login(process.env.DISCORD_TOKEN).then(() => {
    client.user?.setPresence({ activities: [{ name: '/help' }], status: 'idle' })
  })
})()
