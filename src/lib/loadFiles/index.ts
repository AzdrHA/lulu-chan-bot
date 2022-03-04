import * as fs from 'fs';
import print from '../print';
import * as path from 'path';
import Application from '../../components/Application/Application';
import { BaseCommandType } from '../../components/BaseCommand/BaseCommand';
const fsPromises = fs.promises;
import { Server } from 'socket.io';
import { commands, commandsList } from '../../config/Constants';

export type LoadFile = 'command' | 'event' | 'socket';

/**
 * @param {string} dir
 * @param {LoadFile} type
 * @param {Application} client
 * @param {Server} socket
 */
const loadFiles = async (
  dir: string,
  type: LoadFile,
  client: Application,
  socket: Server
): Promise<any> => {
  return fsPromises
    .readdir(dir)
    .then(async (files) => {
      return Promise.all(
        files.map((file, i) => {
          return new Promise((resolve) =>
            setTimeout(async () => {
              const filePath = path.resolve(dir, file);
              const stats = fs.statSync(filePath);
              if (stats.isDirectory()) {
                await loadFiles(filePath, type, client, socket);
              } else if (stats.isFile() && filePath.endsWith('.ts')) {
                const fileName = path.parse(filePath).name;
                const { default: event } = await import(filePath);

                if (type === 'event') {
                  client.on(fileName, (...listener) =>
                    event(client, ...listener)
                  );
                } else if (type === 'command') {
                  const command: BaseCommandType = new event({});
                  // TODO NEED TO ORDER CATEGORY
                  if (!command.multipleCommand) {
                    const hasCommand = commands.get(command.category) ?? [];

                    if (!command.disable)
                      commands.set(
                        command.category,
                        hasCommand.concat([command.alias[0]])
                      );
                  }

                  if (!command.disable)
                    command.alias.forEach((name) => {
                      commandsList.set(name, event);
                    });
                }
              }
              resolve(i * 2);
            }, 100)
          );
        })
      );
    })
    .catch(() => {
      return print.danger('Impossible de get %s path', dir.split('/').pop());
    });
};

export default loadFiles;
