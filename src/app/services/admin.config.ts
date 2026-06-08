/**
 * Email(s) allowed into the admin dashboard.
 *
 * IMPORTANT: this must stay in sync with the `isAdmin()` check in
 * firestore.rules. The client-side checks (guard + login) are for UX; the
 * Firestore rules are the real enforcement.
 */
export const ADMIN_EMAILS: string[] = ['said.elatik.974@gmail.com'];

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
