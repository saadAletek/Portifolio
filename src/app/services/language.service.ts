import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const SUPPORTED_LANGS = ['en', 'ar'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  current: Lang = 'en';

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.translate.addLangs([...SUPPORTED_LANGS]);
    this.translate.setDefaultLang('en');
  }

  isSupported(lang: string | null): lang is Lang {
    return !!lang && (SUPPORTED_LANGS as readonly string[]).includes(lang);
  }

  use(lang: Lang) {
    this.current = lang;
    this.translate.use(lang);
    const html = this.document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }
}
