import { Component } from '@angular/core';
import { skills , languages } from '../../app/pageData'

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.scss'
})
export class AboutmeComponent {
  skills = skills
  languages = languages

}
