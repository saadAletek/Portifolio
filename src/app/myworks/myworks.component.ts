import { Component } from '@angular/core';
import { myWork } from '../../app/pageData'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-myworks',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './myworks.component.html',
  styleUrl: './myworks.component.scss'
})
export class MyworksComponent {
 works = myWork
}
