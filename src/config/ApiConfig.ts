type ApiConfig = {
  get_all_commands: string;
  get_or_create_or_update_setting(guildId: string): string;
  get_image_by_command(command: string): string;
};

export const ApiConfig: ApiConfig = {
  get_all_commands: 'command/category/commands',

  /**
   * @param {string} guildId
   * @return {string}
   */
  get_or_create_or_update_setting(guildId: string) {
    return `guild/setting/${guildId}`;
  },

  /**
   * @param {string} command
   * @return {string}
   */
  get_image_by_command(command: string) {
    return `image/${command}`;
  }
};
