import { Setting } from '../types/Setting';
import { Category } from '../types/Category';

export const commands = new Map<Category, string[]>();
export const settings = new Map<string, Setting>();
export const commandsList = new Map<string, any>();
export const getProjectDir = process.cwd();
export const getAppDir = getProjectDir + '/src';
export const commandsDir = getAppDir + '/commands';
export const eventsDir = getAppDir + '/events';
export const socketDir = getAppDir + '/sockets';
