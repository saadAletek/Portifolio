import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('themeSwitcher') themeSwitcher!: ElementRef;
  @ViewChild('menuHamb') menuHamb!: ElementRef;

  isMenuOpen = false

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public i18n: LanguageService,
    private router: Router,
  ){

  }

  switchLang() {
    const target = this.i18n.current === 'en' ? 'ar' : 'en';
    const segments = this.router.url.split('?')[0].split('/').filter(Boolean);
    segments[0] = target;
    this.router.navigate(['/', ...segments]);
    this.closeMenu();
  }
  
  ngOnInit() {
  }
  isSwitching = false;

  isMenuSwitching = false;


  toggleMen() {
    if (this.isMenuSwitching) return;
    this.isMenuSwitching = true;
    this.menuHamb.nativeElement.classList.add('scale-125');
    setTimeout(() => {
      this.menuHamb.nativeElement.classList.add('rotated');
      setTimeout(() => {
        this.menuHamb.nativeElement.classList.remove('rotated');
        this.menuHamb.nativeElement.classList.remove('scale-125');
        this.isMenuSwitching = false;
        //switch here

        this.toggleMenu()
      }, 300);
    }, 100);
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen
    this.document.querySelector('.menuToOpen')?.classList.toggle('hidden')
  }

  closeMenu(){
    this.isMenuOpen = false
    this.document.querySelector('.menuToOpen')?.classList.add('hidden')
  }


}
