import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from '../services/Page.service';
import { Work } from '../interface/pageInterface.dto';

@Component({
  selector: 'app-myworks',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './myworks.component.html',
  styleUrl: './myworks.component.scss'
})
export class MyworksComponent {
  worksArray :Work[] = []

  constructor (
    private PageService : PageService
  ){}

  ngOnInit(){
    this.PageService.getWorks().subscribe((works)=>{
      this.worksArray = works
    })
  }
}
