import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from '../services/Page.service';
import { Blog, Lang, Skill, Work } from '../interface/pageInterface.dto';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  worksArray :Work[] = []
  blogsArray :Blog[] = []
  skillArray :Skill[] = []
  langsArr : Lang[] = []
  LandingImage:any = 'images/NewSelfie.jpg'

  inputValue: string = '';
  readResults : any

  constructor(
    private PageService:PageService,
    public i18n: LanguageService,
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
    this.PageService.getLangs().subscribe((lang)=>{
      this.langsArr = lang;
    });
  }

}
