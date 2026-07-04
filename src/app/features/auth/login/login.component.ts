import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/login-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
loading = false;
errorMessage = '';
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 login(): void {

  this.errorMessage = '';
  this.loading = true;

  const request: LoginRequest = {
    email: this.username,
    password: this.password
  };

  this.authService.login(request).subscribe({

    next: (response) => {

      this.loading = false;

      if (response.success) {

        this.authService.setToken(response.data.token);
        this.authService.setRefreshToken(response.data.refreshToken);


console.log('Saved token:', this.authService.getToken());

this.router.navigate(['/dashboard']).then(result => {
  console.log('Navigation Result:', result);
  console.log('Current URL:', this.router.url);
});

      } else {
        this.errorMessage = response.message || 'Login failed';
      }

    },

    error: (error) => {
      this.loading = false;
      console.error(error);
      this.errorMessage = 'Server error. Please try again.';
    }

  });
}
showPassword = false;

togglePassword(): void {
  this.showPassword = !this.showPassword;
}
}