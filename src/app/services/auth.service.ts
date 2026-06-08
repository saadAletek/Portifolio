import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { isAdminEmail } from './admin.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  /** Emits the signed-in user (or null) once Firebase has restored the session. */
  readonly user$: Observable<User | null> = authState(this.auth);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Sign in with Google. Because any Google account can authenticate, we
   * immediately sign out and reject anyone who isn't an allowed admin.
   */
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const cred = await signInWithPopup(this.auth, provider);
    if (!isAdminEmail(cred.user.email)) {
      await this.logout();
      throw new Error('not-admin');
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
