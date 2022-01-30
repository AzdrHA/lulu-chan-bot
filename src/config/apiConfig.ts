type ApiConfig = {
  get_all_commands: string;
  get_or_create_or_update_setting(guildId: string): string;
  get_image_by_command(command: string): string;
};

export const ApiConfig: ApiConfig = {
  get_all_commands: 'command/category/commands',
  get_or_create_or_update_setting(guildId: string) {
    return `guild/setting/${guildId}`;
  },
  get_image_by_command(command: string) {
    return `image/${command}`;
  }
};
