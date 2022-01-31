import * as dotenv from 'dotenv';
dotenv.config();

import Application from './components/application/application';
import { Intents } from 'discord.js';
import { AppConfig } from './config/appConfig';

new Application({
  partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
  development: AppConfig.development,
  token: AppConfig.token
});
