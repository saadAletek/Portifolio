import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from '../interface/pageInterface.dto';
import { PageService } from '../services/Page.service';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../directives/reveal.directive';

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [TranslateModule, RevealDirective],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.scss'
})
export class WorkDetailsComponent {
  id: string = ''
  work :Work = {
    id:'',
    name: '',
    link: '',
    image:'',
    details : '',
  }


  constructor(
    private route: ActivatedRoute,
    private PageService: PageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    this.getDetails(this.id)
  }

  getDetails(id:String){
    this.PageService.getWorkById(id).subscribe((work)=>{
    this.work = work
    });
  }

  goBack(){
    this.location.back();
  }


}
