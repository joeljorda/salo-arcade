import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  user$ = this.authService.currentUser$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}