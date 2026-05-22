import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly autService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  isLoggedIn = this.autService.isConnected;
  userName = this.autService.currentUser;
}
