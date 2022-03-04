import * as os from 'os';

export abstract class UtilsSystem {
  /**
   * @return {string}
   */
  public static getArch = (): string => {
    return os.arch();
  };

  /**
   * @return {string}
   */
  public static getCpu = (): string => {
    return os.cpus()[0].model.trim();
  };

  /**
   * @return {string}
   */
  public static getPlatform = (): string => {
    return os.platform();
  };

  /**
   * @return {number}
   */
  public static getTotalRam = (): number => {
    return Math.round(os.totalmem() / (1024 * 1024) / 100) / 10;
  };

  /**
   * @return {number}
   */
  public static getUsedRam = (): number => {
    return Math.round(os.freemem() / (1024 * 1024) / 100) / 10;
  };

  /**
   * @return {string}
   */
  public static getPercentRamUsed = (): string => {
    return (
      Math.round(
        (UtilsSystem.getUsedRam() / UtilsSystem.getTotalRam()) * 1000
      ) / 10
    ).toString();
  };
}
