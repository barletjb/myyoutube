import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly autService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  isLoggedIn = this.autService.isConnected;

  logout() {
    this.autService.logout();
    this.router.navigate(['/auth/login']);
  }

}
