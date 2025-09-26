import { Component } from '@angular/core';
import { Blog } from '../interface/pageInterface.dto';
import { PageService } from '../services/Page.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blogs-details',
  standalone: true,
  imports: [],
  templateUrl: './blogs-details.component.html',
  styleUrl: './blogs-details.component.scss'
})
export class BlogsDetailsComponent {

    id: string = ''
    blog :Blog = {
      id:'',
      name: '',
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
    this.PageService.getBlogById(id).subscribe((blog)=>{
    this.blog = blog
    });
  }

  goBack(){
    this.location.back();
  }


}
