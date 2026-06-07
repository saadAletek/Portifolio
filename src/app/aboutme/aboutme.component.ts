import { Component } from '@angular/core';
import { Lang, Skill } from '../interface/pageInterface.dto';
import { PageService } from '../services/Page.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.scss'
})
export class AboutmeComponent {
  skillArray :Skill[] = []
  langsArr : Lang[] = []
  LandingImage:any = 'images/NewSelfie.jpg'
  // langs : any

  constructor(
    private PageService: PageService,
  ){}

  ngOnInit(): void {
    this.PageService.getSkills().subscribe((skills)=>{
      this.skillArray = skills;
    });
    this.PageService.getLangs().subscribe((lang)=>{
      this.langsArr = lang;
    });
    // this.calculateYearsSince(new Date(2007, 10, 17));
  }

  // calculateYearsSince(startDate: Date): void {
  //   const currentDate = new Date();
  //   const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  //   const hasPassed = currentDate.getMonth() > startDate.getMonth() || 
  //                     (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() >= startDate.getDate());
    
  //   this.currentAge = hasPassed ? yearsDiff : yearsDiff - 1;
  // }

}
