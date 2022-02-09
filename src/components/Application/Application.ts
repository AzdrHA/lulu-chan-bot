import { Client, ClientOptions } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import print from '../../lib/print';
import loadFiles from '../../lib/loadFiles';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { CommandCategory } from '../../types/CommandCategory';
import {
  commands,
  commandsDir,
  eventsDir,
  socketDir
} from '../../config/Constants';

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

  /**
   * @param {ApplicationOption} options
   */
  public constructor(options: ApplicationOption) {
    super(options);

    this.development = options.development;
    this.token = options.token;

    Application.getAllCommands().then((res) => {
      res.forEach((category) => {
        print.info(
          '%s has %s commands',
          category.name,
          category.commands.length
        );
        category.commands.forEach((command) => {
          const hasCommand = commands.get(category.name) ?? [];
          commands.set(category.name, hasCommand.concat([command.name]));
        });
      });
      return httpServer.listen(3232, () => {
        print.info('Socket server is start');
        return this.loadSocket();
      });
    });
  }

  /**
   * @private
   * @return {Promise<CommandCategory[]>}
   */
  private static async getAllCommands(): Promise<CommandCategory[]> {
    return (await makeRequest(ApiConfig.get_all_commands, 'GET')) as Promise<
      CommandCategory[]
    >;
  }

  /**
   * @private
   * @return {Promise<any>}
   */
  private async loadSocket(): Promise<any> {
    print.info('Load Socket Event ...');
    io.on('connection', () => {
      return loadFiles(socketDir, 'socket', this, io);
    });

    return this.loadEvent();
  }

  /**
   * @private
   * @return {Promise<any>}
   */
  private async loadEvent(): Promise<any> {
    print.info('Load Event ...');
    return loadFiles(eventsDir, 'event', this, io).then((r) => {
      console.log('events', r);
      return this.loadCommand();
    });
  }

  /**
   * @private
   * @return {Promise<any>}
   */
  private async loadCommand(): Promise<any> {
    print.info('Load Command ...');
    return loadFiles(commandsDir, 'command', this, io).then((r) => {
      console.log('command', r);
      return this.login(this.token);
    });
  }
}

export default Application;
