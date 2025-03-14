// src/app/customer/customer-dashboard/customer-dashboard.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-dashboard',
  template: `
    <div class="container mt-5">
      <h2>Customer Dashboard</h2>
      <p>Welcome! Here you can view your profile, accounts, and transaction history.</p>
      <!-- Future implementation: account details, mini-statements, transfer forms, etc. -->
    </div>
  `
})
export class CustomerDashboardComponent {}
