import { type ITranslatorAdapter } from '../interface/ITranslatorAdapter'
import { I18n } from 'i18n'
import { TRANSLATION_DIR } from '../config/constant.config'

export class I18nAdapter implements ITranslatorAdapter {
  private readonly data: I18n

  public constructor () {
    this.data = new I18n({
      locales: ['en', 'fr'],
      defaultLocale: 'en',
      directory: TRANSLATION_DIR
    })
  }

  public translate (key: string, ...replace: Array<Record<string, string>>): string {
    return this.data.__mf(key, replace)
  }
}
