import { Client, ClientOptions } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import print from '../../lib/print';
import loadFiles from '../../lib/loadFiles';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { CommandCategory } from '../../types/CommandCategory';
import {
  blacklists,
  commands,
  commandsDir,
  eventsDir,
  owners,
  socketDir
} from '../../config/Constants';
import { Pagination } from '../../types/Pagination';
import { Blacklist } from '../../types/Blacklist';
import { User } from '../../types/User';

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

    this.getUsersOwner();
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
   */
  private async getUsersOwner() {
    print.info('Recovery of the owner ...');
    return makeRequest(ApiConfig.get_user_owner, 'GET').then((res: User[]) =>
      res.map((u) => owners.add(u.userId))
    );
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @private
   */
  private async yoloExe(page: number, limit: number) {
    return makeRequest(
      ApiConfig.get_all_users_blacklist(page, limit),
      'GET'
    ).then(async (data: Pagination<Blacklist>) => {
      if (data.page === 1)
        print.info(
          `${data.total} users blacklist found on ${data.maxPage} pages`
        );

      print.info(`${data.res.length} users blacklist on page ${data.page}`);
      data.res.map((blacklist, i) => {
        blacklists.set(String(blacklist.user.userId), blacklist);
      });

      if (data.maxPage !== 0 && page !== data.maxPage)
        await this.yoloExe(page + 1, limit);
    });
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @private
   */
  private async getUsersBlacklist(page: number, limit: number) {
    print.info('Searching blacklist user ...');
    await this.yoloExe(page, limit);
    return this.loadEvent();
  }

  /**
   * @return {Promise<CommandCategory[]>}
   */
  private static async getAllCommands(): Promise<CommandCategory[]> {
    print.info('Commands retrieval ...');
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

    return this.getUsersBlacklist(1, 25);
  }

  /**
   * @private
   * @return {Promise<any>}
   */
  private async loadEvent(): Promise<any> {
    print.info('Load Event ...');
    return loadFiles(eventsDir, 'event', this, io).then(() => {
      return this.loadCommand();
    });
  }

  /**
   * @private
   * @return {Promise<any>}
   */
  private async loadCommand(): Promise<any> {
    print.info('Load Command ...');
    return loadFiles(commandsDir, 'command', this, io).then(() => {
      return this.login(this.token);
    });
  }
}

export default Application;
