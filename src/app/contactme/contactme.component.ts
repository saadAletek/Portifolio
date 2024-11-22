import { Component } from '@angular/core';
import { personalDetails , socialMedia } from '../../app/pageData'

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [],
  templateUrl: './contactme.component.html',
  styleUrl: './contactme.component.scss'
})
export class ContactmeComponent {
  personalDetails = personalDetails
  socialMedia = socialMedia
}
