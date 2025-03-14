import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginResponse } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login({ email: this.email, password: this.password })
        .subscribe({
          next: (response: LoginResponse) => {
            // Role-based redirection:
            if (response.role === 'admin') {
              this.router.navigateByUrl('/admin-dashboard');
            } else {
              this.router.navigateByUrl('/customer-dashboard');
            }
          },
          error: err => {
            console.error('Login failed', err);
            // Optionally, display a user-friendly error message here.
          }
        });
    }
  }
}