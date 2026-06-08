import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  i18n = inject(LanguageService);

  loading = false;
  googleLoading = false;
  failed = false;
  notAuthorized = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  private goToDashboard() {
    this.router.navigate(['/', this.i18n.current, 'control-panel']);
  }

  async submit() {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.failed = false;
    this.notAuthorized = false;
    try {
      const { email, password } = this.form.value;
      await this.auth.login(email!, password!);
      this.goToDashboard();
    } catch {
      this.failed = true;
    } finally {
      this.loading = false;
    }
  }

  async signInWithGoogle() {
    if (this.googleLoading) return;
    this.googleLoading = true;
    this.failed = false;
    this.notAuthorized = false;
    try {
      await this.auth.loginWithGoogle();
      this.goToDashboard();
    } catch (e: any) {
      const code = e?.code as string | undefined;
      if (e?.message === 'not-admin') {
        this.notAuthorized = true;
      } else if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        // user dismissed the popup — not an error
      } else {
        this.failed = true;
      }
    } finally {
      this.googleLoading = false;
    }
  }
}
