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
    console.log('asd')
    let theme = localStorage.getItem('theme');

    this.isLight = theme === 'true'
    this.changeTheme()
  
    if (!theme) {
      localStorage.setItem('theme', 'false');
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

    this.document.querySelector('body')?.classList.add(this.isLight ? 'light' : 'dark')
    this.document.querySelector('body')?.classList.add(this.isLight ? 'bg-light' : 'bg-dark')
    this.document.querySelector('body')?.classList.add(this.isLight ? 'text-black' : 'text-white')
    this.document.querySelector('body')?.classList.remove(this.isLight ? 'dark' : 'light')
    this.document.querySelector('body')?.classList.remove(this.isLight ? 'bg-dark' : 'bg-light')
    this.document.querySelector('body')?.classList.remove(this.isLight ? 'text-white' : 'text-black')
  }


}
