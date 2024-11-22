import { Component } from '@angular/core';
import { socialMedia } from '../../app/pageData'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socialMedia = socialMedia;
}
