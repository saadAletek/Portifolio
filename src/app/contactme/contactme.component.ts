import { Component } from '@angular/core';
import { phone , mail , Twitter , github , insta } from '../../app/pageData'

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [],
  templateUrl: './contactme.component.html',
  styleUrl: './contactme.component.scss'
})
export class ContactmeComponent {
  mail = mail
  phone = phone
  Twitter = Twitter
  github = github
  insta = insta
}
