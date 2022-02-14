import { Category } from '../types/Category';
import { Blacklist } from '../types/Blacklist';
import { Snowflake } from 'discord-api-types';

export const commands = new Map<Category, string[]>();
export const owners = new Set<Snowflake>();
export const commandsList = new Map<string, any>();
export const blacklists = new Map<Snowflake, Blacklist>();
export const getProjectDir = process.cwd();
export const getAppDir = getProjectDir + '/src';
export const commandsDir = getAppDir + '/commands';
export const eventsDir = getAppDir + '/events';
export const socketDir = getAppDir + '/sockets';
