import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  constructor(private router: Router) {}

  // Trigger navigation to mini-statement for a selected account.
  onAccountSelected(accountId: string): void {
    this.router.navigate(['customer-dashboard/mini-statement', accountId]);
  }
}
