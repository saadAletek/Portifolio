import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageService } from '../services/Page.service';
import { personalData } from '../interface/pageInterface.dto';

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [],
  templateUrl: './contactme.component.html',
  styleUrl: './contactme.component.scss'
})
export class ContactmeComponent {
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('msg') msg!: ElementRef;

  personalData:personalData = {}

  constructor(
    private PageService :PageService
  ){}

  ngOnInit(){
    this.PageService.personelData().subscribe((pd)=>{
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

}
