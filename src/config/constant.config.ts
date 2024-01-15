import * as util from 'util'
import { type ICommand } from '../interface/Command/ICommand'
import * as process from 'process'

export const PROJECT_DIR = process.cwd()
export const APP_DIR = util.format('%s/src', PROJECT_DIR)
export const COMMAND_DIR = util.format('%s/command', APP_DIR)
export const EVENT_DIR = util.format('%s/event', APP_DIR)
export const TRANSLATION_DIR = util.format('%s/translation', APP_DIR)
export const COMMAND_LIST = new Map<string, ICommand>()

export const POLICY_URL = 'https://lulu-chan.com/privacy-policy'
export const INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=578907743122096148&permissions=842525950&scope=bot'
export const SUPPORT_URL = 'https://discord.gg/Jb6JwTd'
export const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN ?? ' '
export const DISCORD_CLIENT_ID: string = process.env.DISCORD_CLIENT_ID ?? ' '

export const DEVELOPMENT_NODE_ENV = 'development'
export const PRODUCTION_NODE_ENV = 'production'
export const TEST_NODE_ENV = 'test'
export const NODE_ENV: string = process.env.NODE_ENV ?? DEVELOPMENT_NODE_ENV
export const IS_DEVELOPMENT = NODE_ENV === DEVELOPMENT_NODE_ENV
