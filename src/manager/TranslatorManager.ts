import { type ITranslatorAdapter } from '../interface/ITranslatorAdapter'
import { I18nAdapter } from '../adapter/I18nAdapter'

export class TranslatorManager {
  private readonly translator: ITranslatorAdapter

  public constructor (translator: ITranslatorAdapter) {
    this.translator = translator
  }

  public translate (key: string): string {
    return this.translator.translate(key)
  }
}

export default new TranslatorManager(new I18nAdapter())
