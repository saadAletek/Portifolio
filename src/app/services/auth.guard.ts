import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs';
import { LanguageService } from './language.service';

/**
 * Protects the admin dashboard. Only a signed-in Firebase user may enter;
 * everyone else is sent to the login page (in the current language).
 *
 * During SSR we don't have the browser auth session, so we redirect to login
 * and let the browser re-evaluate after hydration. This avoids the SSR render
 * hanging on an auth state that never resolves on the server.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const i18n = inject(LanguageService);
  const loginUrl = () => router.createUrlTree(['/', i18n.current, 'admin-login']);

  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return loginUrl();
  }

  const auth = inject(Auth);
  return authState(auth).pipe(
    take(1),
    map((user) => (user ? true : loginUrl())),
  );
};
