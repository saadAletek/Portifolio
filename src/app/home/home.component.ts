import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from '../services/Page.service';
import { Blog, Skill, Work } from '../interface/pageInterface.dto';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  worksArray :Work[] = []
  blogsArray :Blog[] = []
  skillArray :Skill[] = []
  langs : any
  LandingImage:any

  inputValue: string = '';
  readResults : any

  constructor(
    private PageService:PageService,
  ){}

  ngOnInit(){
    this.PageService.getWorks().subscribe((works)=>{
      this.worksArray = works.slice(0, 4)
    });
    this.PageService.getBlogs().subscribe((blog)=>{
      this.blogsArray = blog.slice(0, 4)
    });
    this.PageService.getSkills().subscribe((skills)=>{
      skills.filter((skill) => { skill.main ? this.skillArray.push(skill) : '' } )
    });
    this.PageService.LandingData().subscribe((landing)=>{
      this.LandingImage = landing.img
    });
  }

}
