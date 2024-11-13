import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('themeSwitcher') themeSwitcher!: ElementRef;

  constructor(
    
    @Inject(DOCUMENT) private document: Document,
  ){
    
  }
  
  ngOnInit(){
    let theme = localStorage.getItem('theme');

    this.isLight = theme === 'true'
    this.changeTheme()
  
    if (!theme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      this.isLight = !prefersDark;
      
      localStorage.setItem('theme', this.isLight ? 'true' : 'false');
      
    this.changeTheme()
    } else {

      this.isLight = theme === 'true';
    }  
    
    console.log('Theme:', theme);
  
  }

  isLight = false;
  isSwitching = false;

  toggleTheme() {
    if (this.isSwitching) return;
    this.isSwitching = true;
    this.themeSwitcher.nativeElement.classList.add('scale-125');
    setTimeout(() => {
      this.themeSwitcher.nativeElement.classList.add('rotated');
      setTimeout(() => {
        this.themeSwitcher.nativeElement.classList.remove('rotated');
        this.themeSwitcher.nativeElement.classList.remove('scale-125');
        this.isSwitching = false;
        //switch here
        
    this.isLight = !this.isLight;
        this.changeTheme()
      }, 400);
    }, 100);
  }



  changeTheme(){

    localStorage.setItem('theme', `${this.isLight}`);


    this.document.querySelector('body')?.classList.add(this.isLight ? 'body-light' : 'body-dark')
    this.document.querySelector('body')?.classList.remove(this.isLight ? 'body-dark' : 'body-light')

    
    document.documentElement.style.setProperty('--main-bg', this.isLight ? '#DADADA' : '#232323');
    document.documentElement.style.setProperty('--lighter-bg', this.isLight ? '#EBEBEB' : '#404040');
    document.documentElement.style.setProperty('--font-color', this.isLight ? '#000000' : '#ffffff');
  }


}
