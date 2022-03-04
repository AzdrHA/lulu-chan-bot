import UtilsStr from '../utils/UtilsStr';
import { RoleEmoji } from '../types/RoleEmoji';

export const AppConfig = {
  api_domain: process.env.API_URL,
  cdn_domain: process.env.CDN_URL,
  api_token: process.env.API_TOKEN,
  add_bot_link: process.env.ADD_BOT_LINK,
  support_invite: process.env.SUPPORT_INVITE,

  guild_count_channel: '660852164846944275',
  member_count_channel: '949254398100529153',
  luluchan_guild_id: '587424467538673664',

  roles: {
    team: {
      message: '653582517982461983',
      roles: [
        {
          name: 'cookie',
          id: '641670929021403156',
          role: '641211716998266891'
        },
        {
          name: 'waffle',
          id: '653583989457813525',
          role: '623953299707658260'
        },
        {
          name: 'speculos',
          id: '641670916946001941',
          role: '641210240326696992'
        },
        {
          name: '🔔',
          id: null,
          role: '703964463690416208'
        }
      ] as RoleEmoji[]
    }
  },

  channel: {
    direct_message: '937472833280421948',
    add_bot: '937453331465531413',
    remove_bot: '937453344698552421',
    member_join: '937762144756322354',
    member_leave: '937762169716625498',
    error: '937690625510359050'
  },

  token: process.env.TOKEN ?? 'token not found',
  development: Boolean(process.env.DEVELOPMENT) ?? true,
  owners: UtilsStr.convertStringArrayToArray(process.env.OWNERS ?? '[]')
};
