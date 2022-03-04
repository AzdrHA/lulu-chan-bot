import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import * as util from 'util';
import childProcess from 'child_process';
import { UtilsSystem } from '../../utils/UtilsSystem';
import { CommandConstructor } from '../../types/CommandConstructor';

export default class Info extends BaseCommand {
  public alias: string[];
  public allowDM: boolean;
  public category: Category;
  public cooldown: number;
  public description: string;
  public disable: boolean;
  public example: string;
  public onlyDev: boolean;
  public multipleCommand: boolean;

  /**
   * @param {CommandConstructor} props
   */
  public constructor(props: CommandConstructor) {
    super(props);

    this.alias = ['info'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 0;
    this.description = '';
    this.disable = true;
    this.example = '{prefix} info';
    this.onlyDev = false;
  }

  /**
   * @return {Promise<Message>}
   */
  public execute = async (): Promise<Message> => {
    const exec = util.promisify(childProcess.exec);
    // const {stdout} = await exec('git log --pretty="%ct" -n 1');
    // const {stdout} = await exec('git show -s --date=format:%cd --format=%cd');
    const { stdout } = await exec('git show -s --format=%ct');
    // const oneDay = 24 * 60 * 60 * 1000;

    return this.messageEmbed({
      fields: [
        {
          name: 'Servers',
          value: this.client.guilds.cache.size.toString(),
          inline: true
        },
        {
          name: 'Users',
          value: this.client.users.cache.size.toString(),
          inline: true
        },
        {
          name: 'Channels',
          value: this.client.channels.cache.size.toString(),
          inline: true
        },
        {
          name: 'Processor',
          value: UtilsSystem.getCpu(),
          inline: false
        },
        {
          name: 'Platform',
          value: UtilsSystem.getPlatform(),
          inline: true
        },
        {
          name: 'Architecture',
          value: UtilsSystem.getArch(),
          inline: true
        },
        {
          name: 'Ram',
          value: `${UtilsSystem.getUsedRam()}Gb / ${UtilsSystem.getTotalRam()}Gb (${UtilsSystem.getPercentRamUsed()}%)`,
          inline: true
        },
        {
          name: 'UpTime',
          value: this.client.uptime.toString(),
          inline: true
        },
        {
          name: 'Last update',
          value: `${parseInt(stdout)} | v.${process.env.npm_package_version}`,
          inline: true
        }
      ]
    });
  };
}
