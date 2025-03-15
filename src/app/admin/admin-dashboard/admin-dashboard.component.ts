import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container mt-4">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Choose an option below:</p>
      <div class="list-group">
        <a routerLink="/admin/customers" class="list-group-item list-group-item-action">Manage Customers</a>
        <a routerLink="/admin/accounts" class="list-group-item list-group-item-action">Manage Bank Accounts</a>
        <a routerLink="/admin/transactions" class="list-group-item list-group-item-action">Pending Transactions</a>
        <!-- Future links: Transaction Search, Audit Logs, etc. -->
      </div>
    </div>
  `,
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {}
