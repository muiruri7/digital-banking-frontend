// src/app/navbar/navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication state to update the navbar accordingly
    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  // Call the logout method from AuthService when user clicks the Logout button
  logout(): void {
    this.authService.logout();
  }
}
