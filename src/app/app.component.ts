import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portifolio';

  // Hidden on admin routes (login / control panel), which use their own layout.
  hideChrome = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        let r = this.route.firstChild;
        while (r?.firstChild) {
          r = r.firstChild;
        }
        this.hideChrome = !!r?.snapshot.data['hideChrome'];
      });
  }
}
