import { Client, ClientOptions } from 'discord.js';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';
import { Category } from '../../types/Category';
import { commands, commandsDir, eventsDir } from '../../lib/constants';
import print from '../../lib/print';
import loadFiles from '../../lib/loadFiles';

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
          const hasCommand = commands.get(category.name) ?? [];
          commands.set(category.name, hasCommand.concat([command.name]));
        });
      });
      return this.loadEvent();
    });
  }

  private static async getAllCommands() {
    return makeRequest(ApiConfig.get_all_commands, 'GET');
  }

  private async loadEvent() {
    print.info('Load Event ...');
    return loadFiles(eventsDir, 'event', this).then(() => {
      return this.loadCommand();
    });
  }

  private async loadCommand() {
    print.info('Load Command ...');
    return loadFiles(commandsDir, 'command', this).then(() => {
      return this.login(this.token);
    });
  }
}

export default Application;
