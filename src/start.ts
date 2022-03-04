import * as dotenv from 'dotenv';
dotenv.config();
import { ShardingManager } from 'discord.js';
import { AppConfig } from './config/AppConfig';

const manager = new ShardingManager('./dist/main.js', {
  totalShards: 'auto',
  token: AppConfig.token
});

manager.on('shardCreate', (shard) => console.log(`Launched shard ${shard.id}`));

manager.spawn().then((r) => {
  console.log('Shard spawn', r);
});
