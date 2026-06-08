import { Component } from '@angular/core';
import { PageService } from '../services/Page.service';
import { Blog } from '../interface/pageInterface.dto';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { RevealDirective } from '../directives/reveal.directive';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterModule, TranslateModule, RevealDirective],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  blogsArray :Blog[] = []

  constructor (
    private PageService : PageService,
    public i18n: LanguageService,
  ){}

  ngOnInit(){
    this.PageService.getBlogs().subscribe((blogs)=>{
      this.blogsArray = blogs
    })
  }
}
