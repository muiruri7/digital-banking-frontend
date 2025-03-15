import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-account-management',
  templateUrl: './admin-account-management.component.html',
  styleUrls: ['./admin-account-management.component.scss']
})
export class AdminAccountManagementComponent implements OnInit {
  accounts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/accounts/all`)
      .subscribe({
        next: data => this.accounts = data,
        error: err => console.error('Error loading accounts:', err)
      });
  }

  freezeAccount(account: any): void {
    if(confirm(`Are you sure you want to freeze account ${account.id}?`)) {
      this.http.put(`${environment.apiBaseUrl}/api/accounts/${account.id}/freeze`, {})
        .subscribe({
          next: () => {
            console.log('Account frozen:', account);
            this.loadAccounts();
          },
          error: err => console.error('Error freezing account:', err)
        });
    }
  }

  unfreezeAccount(account: any): void {
    if(confirm(`Are you sure you want to unfreeze account ${account.id}?`)) {
      this.http.put(`${environment.apiBaseUrl}/api/accounts/${account.id}/unfreeze`, {})
        .subscribe({
          next: () => {
            console.log('Account unfrozen:', account);
            this.loadAccounts();
          },
          error: err => console.error('Error unfreezing account:', err)
        });
    }
  }
}
