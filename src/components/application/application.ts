import { Client, ClientOptions } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { Category } from '../../types/Category';
import {
  CommandCategory,
  commands,
  commandsDir,
  eventsDir,
  socketDir
} from '../../lib/constants';
import print from '../../lib/print';
import loadFiles from '../../lib/loadFiles';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

// Create Socket Server
const httpServer = createServer();
export const io = new Server(httpServer, {
  cors: {
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});

interface ApplicationOption extends ClientOptions {
  development: boolean;
  token: string;
}

class Application extends Client {
  public development: boolean;
  public token: string;

  public constructor(options: ApplicationOption) {
    super(options);

    this.development = options.development;
    this.token = options.token;

    Application.getAllCommands().then(async (res: Category[]) => {
      res.forEach((category) => {
        print.info(
          '%s has %s commands',
          category.name,
          category.commands.length
        );
        category.commands.forEach((command) => {
          const hasCommand = commands.get(<CommandCategory>category.name) ?? [];
          commands.set(
            <CommandCategory>category.name,
            hasCommand.concat([command.name])
          );
        });
      });
      return httpServer.listen(3232, () => {
        print.info('Socket server is start');
        return this.loadSocket();
      });
    });
  }

  private static async getAllCommands() {
    return makeRequest(ApiConfig.get_all_commands, 'GET');
  }

  private async loadSocket() {
    print.info('Load Socket Event ...');
    io.on('connection', (socket: Socket) => {
      return loadFiles(socketDir, 'socket', this, io);
    });

    return this.loadEvent();
  }

  private async loadEvent() {
    print.info('Load Event ...');
    return loadFiles(eventsDir, 'event', this, io).then(() => {
      return this.loadCommand();
    });
  }

  private async loadCommand() {
    print.info('Load Command ...');
    return loadFiles(commandsDir, 'command', this, io).then(() => {
      return this.login(this.token);
    });
  }
}

export default Application;
