import UtilsStr from '../utils/utilsStr';

export const AppConfig = {
  api_domain: process.env.API_URL,
  cdn_domain: process.env.CDN_URL,
  api_token: process.env.API_TOKEN,
  add_bot_link: process.env.ADD_BOT_LINK,
  support_invite: process.env.SUPPORT_INVITE,

  guild_count_channel: '660852164846944275',
  member_count_channel: '660846057785393162',
  luluchan_guild_id: '587424467538673664',

  channel: {
    direct_message: '937472833280421948',
    add_bot: '937453331465531413',
    remove_bot: '937453344698552421',
    member_join: '937762144756322354',
    member_leave: '937762169716625498',
    error: '937690625510359050'
  },

  token: process.env.TOKEN,
  development: Boolean(process.env.DEVELOPMENT) ?? true,
  owners: UtilsStr.convertStringArrayToArray(process.env.OWNERS)
};
