import * as dotenv from 'dotenv';
dotenv.config();

import Application from './components/application/application';
import { Intents } from 'discord.js';
import { AppConfig } from './config/appConfig';

new Application({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  development: AppConfig.development,
  token: AppConfig.token
});
