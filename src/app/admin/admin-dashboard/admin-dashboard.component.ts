// src/app/admin/admin-dashboard/admin-dashboard.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Here you can manage customers, accounts, transactions, and audit logs.</p>
      <!-- Future implementation: list of customers, account management controls, etc. -->
    </div>
  `
})
export class AdminDashboardComponent {}
