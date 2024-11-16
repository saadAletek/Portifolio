import { Component } from '@angular/core';
import { Twitter , github , insta } from '../../app/pageData'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  Twitter = Twitter
  github = github
  insta = insta

}
