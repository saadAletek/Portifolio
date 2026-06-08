import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from '../services/Page.service';
import { Work } from '../interface/pageInterface.dto';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { RevealDirective } from '../directives/reveal.directive';

@Component({
  selector: 'app-myworks',
  standalone: true,
  imports: [RouterModule, TranslateModule, RevealDirective],
  templateUrl: './myworks.component.html',
  styleUrl: './myworks.component.scss'
})
export class MyworksComponent {
  worksArray :Work[] = []

  constructor (
    private PageService : PageService,
    public i18n: LanguageService,
  ){}

  ngOnInit(){
    this.PageService.getWorks().subscribe((works)=>{
      this.worksArray = works
    })
  }
}
