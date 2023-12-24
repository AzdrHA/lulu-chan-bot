import { ITranslatorAdapter } from '../interface/ITranslatorAdapter';
import { I18n } from 'i18n';
import { TRANSLATION_DIR } from '../config/Constant';


export class I18nAdapter implements ITranslatorAdapter {
  private data: I18n;

  public constructor() {
    this.data = new I18n({
      locales: ['en', 'fr'],
      defaultLocale: 'en',
      directory: TRANSLATION_DIR
    });
  }

  public translate(key: string, ...replace: any[]): string {
    return this.data.__mf(key, replace);
  }
}