import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, NavigationStart, Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from 'app/common/header/header.component';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  router = inject(Router);

  msgSuccess = null;
  msgInfo = null;
  msgError = null;

  constructor(private route: ActivatedRoute)  {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['logoutSuccess'] === 'true') {
        this.router.navigate(['/']/*, {
          state: {
            msgInfo: 'logoutSuccess'
          }
        }*/);
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const navigationState = this.router.getCurrentNavigation()?.extras.state;
        this.msgSuccess = navigationState?.['msgSuccess'] || null;
        this.msgInfo = navigationState?.['msgInfo'] || null;
        this.msgError = navigationState?.['msgError'] || null;
      }
    });
  }
}
