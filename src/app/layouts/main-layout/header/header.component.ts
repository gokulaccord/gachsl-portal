import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  username = 'Guest';
  role = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loadUser();
  }

  loadUser(): void {
  const user = this.authService.getUser();

  if (!user) return;

  this.username =
    user.FullName ||
    user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
    'User';

  this.role =
    user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
    '';
}

  logout(): void {
    this.authService.logout();
  }
}