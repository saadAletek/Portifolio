import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { myWork , skills } from '../../app/pageData'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  works = myWork.slice(0, 4)
  skills = skills.slice(0, 5)
}
