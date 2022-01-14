type ApiConfig = {
  get_all_commands: string;
  get_or_create_setting(guildId: string): string;
};

export const ApiConfig: ApiConfig = {
  get_all_commands: 'command/category/commands',
  get_or_create_setting(guildId: string) {
    return `guild/setting/${guildId}`;
  }
};
