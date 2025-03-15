import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication status and update role accordingly.
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      this.userRole = auth ? this.authService.getUserRole() : null;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
