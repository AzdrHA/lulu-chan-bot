import UtilsStr from '../utils/utilsStr';

export const AppConfig = {
  api_domain: process.env.API_URL,
  cdn_domain: process.env.CDN_URL,
  api_token: process.env.API_TOKEN,
  add_bot_link: process.env.ADD_BOT_LINK,
  support_invite: process.env.SUPPORT_INVITE,
  log_add_bot_channel: '937453331465531413',
  log_remove_bot_channel: '937453344698552421',
  log_direct_message: '937472833280421948',
  guild_count_channel: '660852164846944275',
  error_channel: '937690625510359050',
  member_count_channel: '660846057785393162',
  luluchan_guild_id: '587424467538673664',
  token: process.env.TOKEN,
  development: Boolean(process.env.DEVELOPMENT) ?? true,
  owners: UtilsStr.convertStringArrayToArray(process.env.OWNERS)
};
