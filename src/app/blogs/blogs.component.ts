import { Component } from '@angular/core';
import { PageService } from '../services/Page.service';
import { Blog } from '../interface/pageInterface.dto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  blogsArray :Blog[] = []

  constructor (
    private PageService : PageService
  ){}

  ngOnInit(){
    this.PageService.getBlogs().subscribe((blogs)=>{
      this.blogsArray = blogs
    })
  }
}
