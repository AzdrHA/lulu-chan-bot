import DefaultEmbedBuilder from './DefaultEmbedBuilder'
import { type IEmbedBuilder } from '../interface/IEmbedBuilder'
import { INVITE_URL } from '../config/constant.config'
import { type EmbedBuilder } from 'discord.js'

export default class InviteCommandEmbedBuilder extends DefaultEmbedBuilder implements IEmbedBuilder {
  public build (): EmbedBuilder {
    return this.setDescription(`:mailbox_with_mail: [Invite me to your server!](${INVITE_URL})`)
  }
}
