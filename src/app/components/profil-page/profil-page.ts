import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profil-page',
  imports: [DatePipe],
  templateUrl: './profil-page.html',
  styleUrl: './profil-page.css',
})
export class ProfilPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoggedIn = this.authService.isConnected;
  user = this.authService.currentUser;

  getInitials(): string {
    const name = this.user()?.username ?? '';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
