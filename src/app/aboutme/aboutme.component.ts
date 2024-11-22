import { Component } from '@angular/core';
import { skills } from '../../app/pageData'

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.scss'
})
export class AboutmeComponent {
  skills = skills
  currentAge: number = 17;


  ngOnInit(): void {
    this.calculateYearsSince(new Date(2007, 10, 17));
  }

  calculateYearsSince(startDate: Date): void {
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
    const hasPassed = currentDate.getMonth() > startDate.getMonth() || 
                      (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() >= startDate.getDate());
    
    this.currentAge = hasPassed ? yearsDiff : yearsDiff - 1;
  }

}
