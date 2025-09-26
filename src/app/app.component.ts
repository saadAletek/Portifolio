import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';


// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { firebaseConfig } from '../environment/environment'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent , FooterComponent , HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portifolio';

//  app = initializeApp(firebaseConfig);
//  analytics = getAnalytics(this.app);

}



