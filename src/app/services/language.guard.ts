import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService } from './language.service';

export const languageGuard: CanActivateFn = (route) => {
  const languageService = inject(LanguageService);
  const router = inject(Router);
  const lang = route.paramMap.get('lang');

  if (languageService.isSupported(lang)) {
    languageService.use(lang);
    return true;
  }

  return router.createUrlTree(['/en']);
};
