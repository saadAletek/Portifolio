import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { PageService } from '../services/Page.service';
import { personalData } from '../interface/pageInterface.dto';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contactme.component.html',
  styleUrl: './contactme.component.scss'
})
export class ContactmeComponent {
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('msg') msg!: ElementRef;

  personalData:personalData = {}

  constructor(
    private PageService :PageService,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
  ){
        this.formGroup = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(){
    this.PageService.personalData().subscribe((pd)=>{
      this.personalData = pd
    })
  }

  onFocus(element:any){
    let letters = element.querySelectorAll('span')
    for(let i = 0; i < letters.length; i++){
      setTimeout(()=>{
        letters[i].style.top = '0'
      }, i * 50)
    }
  }

  onBlur(element:any){
    let letters = element.querySelectorAll('span')
    if(element.nextElementSibling.value == '')
    for(let i = 0; i < letters.length; i++){
      setTimeout(()=>{
        letters[i].style.top = '38px'
      }, i * 30)
    }
  }
  onSubmit(){

  }

  
  
  formGroup: FormGroup;

    private timeoutId: ReturnType<typeof setTimeout> | null = null;

  CurrencyMenuOpen = false
  MenuTran = false

  sendInfo(){
    console.log(this.formGroup.value)
    if(this.formGroup.valid){
      this.toggleMenu()
      this.formGroup.reset();
    }else{
      this.formGroup.dirty
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
  }
}
