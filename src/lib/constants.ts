export type CommandCategory = 'emote' | 'reaction' | 'hentai' | 'porn';
export const commands = new Map<CommandCategory, string[]>();
export const commandsList = new Map<string, any>();
export const getProjectDir = process.cwd();
export const getAppDir = getProjectDir + '/src';
export const commandsDir = getAppDir + '/commands';
export const eventsDir = getAppDir + '/events';
export const socketDir = getAppDir + '/sockets';
