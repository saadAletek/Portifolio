import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('themeSwitcher') themeSwitcher!: ElementRef;

  isLight = false;

  toggleTheme() {
    this.isLight =!this.isLight;
    this.themeSwitcher.nativeElement.classList.add('scale-125');
    setTimeout(() => {
        this.themeSwitcher.nativeElement.classList.add('rotated');
      setTimeout(() => {
        this.themeSwitcher.nativeElement.setAttribute('src', this.isLight ? 'images/dark.svg' : 'images/light.svg')
      }, 400);
      setTimeout(() => {
        this.themeSwitcher.nativeElement.classList.remove('rotated');
    this.themeSwitcher.nativeElement.classList.remove('scale-125');

      }, 600);
    }, 200)
  }

}
