import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { PageService } from '../services/Page.service';
import { personalData } from '../interface/pageInterface.dto';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../directives/reveal.directive';

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    RevealDirective
  ],
  templateUrl: './contactme.component.html',
  styleUrl: './contactme.component.scss'
})
export class ContactmeComponent {
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('msg') msg!: ElementRef;
  formGroup: FormGroup;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  personalData:personalData = {}

  sending = false;
  sendError = false;

  // Anti-spam: minimum seconds between submissions from this browser.
  private readonly COOLDOWN_SECONDS = 30;
  private readonly COOLDOWN_KEY = 'lastContactSubmit';

  constructor(
    private PageService :PageService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
  ){
      this.formGroup = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
      // Honeypot: hidden from real users; bots tend to fill every field.
      company: new FormControl(''),
    });
  }

  ngOnInit(){
    this.PageService.personalData().subscribe((pd)=>{
      this.personalData = pd
    })
  }

  // Arabic letters that only connect to the preceding letter (never to the following one).
  private readonly arabicRightJoining = new Set([
    'آ','أ','ؤ','إ','ا','ة','د','ذ',
    'ر','ز','و','ٱ','ۀ','ے','ۓ','ڈ','ڑ'
  ]);

  private isArabicLetter(ch?: string): boolean {
    if (!ch) return false;
    const c = ch.codePointAt(0)!;
    return (c >= 0x0621 && c <= 0x064A) || (c >= 0x066E && c <= 0x06D3) || (c >= 0x0750 && c <= 0x077F);
  }

  // Can join to the following (left) letter — only dual-joining letters can.
  private joinsToNext(ch?: string): boolean {
    return this.isArabicLetter(ch) && ch !== 'ء' && !this.arabicRightJoining.has(ch!);
  }

  // Can join to the preceding (right) letter — any joining Arabic letter can.
  private joinsToPrev(ch?: string): boolean {
    return this.isArabicLetter(ch) && ch !== 'ء';
  }

  /**
   * Splits a label into one entry per character so each can be animated separately.
   * For Arabic, Zero-Width Joiners are added around letters that should stay connected,
   * preserving the cursive (initial/medial/final) glyph forms when split into spans.
   * For non-Arabic text the joiners are never added, so it returns plain characters.
   */
  toAnimatedLetters(text: string): string[] {
    const ZWJ = '‍';
    const chars = Array.from(text ?? '');
    return chars.map((ch, i) => {
      const joinPrev = this.joinsToNext(chars[i - 1]) && this.joinsToPrev(ch);
      const joinNext = this.joinsToNext(ch) && this.joinsToPrev(chars[i + 1]);
      return (joinPrev ? ZWJ : '') + ch + (joinNext ? ZWJ : '');
    });
  }

  // Pending stagger timeouts per label, so a new focus/blur can cancel the previous animation.
  private letterTimers = new Map<any, ReturnType<typeof setTimeout>[]>();

  private animateLetters(element: any, top: string, stagger: number) {
    // Cancel any in-flight animation for this label first, otherwise leftover
    // timeouts from the previous direction land after the new ones and the word
    // ends up half-up / half-down.
    this.letterTimers.get(element)?.forEach(clearTimeout);

    const letters = element.querySelectorAll('span');
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < letters.length; i++) {
      timers.push(setTimeout(() => {
        letters[i].style.top = top;
      }, i * stagger));
    }
    this.letterTimers.set(element, timers);
  }

  onFocus(element:any){
    this.animateLetters(element, '0', 50);
  }
  onBlur(element:any){
    if(element.nextElementSibling.value == ''){
      this.animateLetters(element, '38px', 30);
    }
  }

  CurrencyMenuOpen = false
  MenuTran = false

  async sendInfo(){
    if (this.sending) return;
    this.sendError = false;

    // Honeypot tripped → silently pretend success, write nothing.
    if (this.formGroup.get('company')?.value) {
      this.resetForm();
      this.toggleMenu();
      return;
    }

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    // Simple per-browser rate limit.
    if (this.isOnCooldown()) {
      this.sendError = true;
      return;
    }

    this.sending = true;
    try {
      const { name, email, message } = this.formGroup.value;
      await this.PageService.addMessage({ name, email, message });
      this.stampCooldown();
      this.resetForm();
      this.toggleMenu();
    } catch {
      this.sendError = true;
    } finally {
      this.sending = false;
    }
  }

  private resetForm() {
    this.formGroup.reset();
    if (this.name) this.onBlur(this.name.nativeElement);
    if (this.email) this.onBlur(this.email.nativeElement);
    if (this.msg) this.onBlur(this.msg.nativeElement);
  }

  private isOnCooldown(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    try {
      const last = Number(localStorage.getItem(this.COOLDOWN_KEY) ?? 0);
      return Date.now() - last < this.COOLDOWN_SECONDS * 1000;
    } catch {
      return false;
    }
  }

  private stampCooldown() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(this.COOLDOWN_KEY, String(Date.now()));
    } catch {
      // ignore (private mode / storage disabled)
    }
  }

  checkForInputs(name:string){
    return this.formGroup.controls[name].invalid && this.formGroup.controls[name].dirty && this.formGroup.controls[name].touched;
  }
  
  toggleMenu(){
    if(this.CurrencyMenuOpen){
      this.timeoutId = setTimeout(() => {
        this.CurrencyMenuOpen = false
      }, 250);
      this.MenuTran = false
      this.document.querySelector('body')?.classList.remove('popupOpen')
    }else{
      this.CurrencyMenuOpen = true
      this.timeoutId = setTimeout(() => {
        this.MenuTran = true
      }, 250);
      this.document.querySelector('body')?.classList.add('popupOpen')
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.letterTimers.forEach(timers => timers.forEach(clearTimeout));
    this.letterTimers.clear();
  }
}
