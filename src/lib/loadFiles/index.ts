import * as fs from 'fs';
import print from '../print';
import * as path from 'path';
import Application from '../../components/application/application';
const fsPromises = fs.promises;

export type LoadFile = 'command' | 'event';

const loadFiles = async (dir: string, type: LoadFile, client: Application) => {
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
                await loadFiles(filePath, type, client);
              } else if (stats.isFile() && filePath.endsWith('.ts')) {
                const fileName = path.parse(filePath).name;
                const { default: event } = await import(filePath);
                if (!event)
                  return print.danger('%s is not configured', fileName);

                if (type === 'event') {
                  client.on(fileName, (listener) => event(client, listener));
                } else if (type === 'command') {
                  const command = new event();
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
