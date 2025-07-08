import {Component, inject} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {AuthenticationService} from "../../service/authentication.service";


@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  authenticationService = inject(AuthenticationService);
}
