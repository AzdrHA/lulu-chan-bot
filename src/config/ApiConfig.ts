type ApiConfig = {
  get_all_commands: string;
  get_all_users_blacklist(page: number, limit: number): string;
  get_or_create_or_update_setting(guildId: string): string;
  get_image_by_command(command: string): string;
};

export const ApiConfig: ApiConfig = {
  get_all_commands: 'command/category/commands',

  /**
   * @param {number} page
   * @param {number} limit
   * @return {string}
   */
  get_all_users_blacklist(page: number, limit: number): string {
    return `user/blacklist?page=${page}&limit=${limit}`;
  },

  /**
   * @param {string} guildId
   * @return {string}
   */
  get_or_create_or_update_setting(guildId: string): string {
    return `guild/setting/${guildId}`;
  },

  /**
   * @param {string} command
   * @return {string}
   */
  get_image_by_command(command: string): string {
    return `image/${command}`;
  }
};
