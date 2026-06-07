import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const TRANSLATIONS: Record<string, unknown> = { en, ar };

export class StaticTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<unknown> {
    return of(TRANSLATIONS[lang] ?? {});
  }
}
