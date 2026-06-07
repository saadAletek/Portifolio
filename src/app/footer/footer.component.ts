import { Component } from '@angular/core';
import { PageService } from '../services/Page.service';
import { personalData } from '../interface/pageInterface.dto';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    personalData:personalData = {}
  
    constructor(
      private PageService :PageService
    ){}
  
    ngOnInit(){
      this.PageService.personalData().subscribe((pd)=>{
        this.personalData = pd
      })
    }

}
