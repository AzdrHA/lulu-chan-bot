import { Snowflake } from 'discord-api-types';

type ApiConfig = {
  get_all_commands: string;
  blacklist: {
    add: string;
    remove: (id: Snowflake) => string;
  };
  get_user_owner: string;
  get_all_users_blacklist(page: number, limit: number): string;
  get_or_create_or_update_setting(guildId: string): string;
  get_image_by_command(command: string): string;
};

export const ApiConfig: ApiConfig = {
  get_all_commands: 'command/category/commands',

  blacklist: {
    add: 'user/blacklist',
    remove: (id: Snowflake) => {
      return `user/blacklist/${id}`;
    }
  },

  get_user_owner: '/user/owners',

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
