import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-linked-accounts',
  templateUrl: './linked-accounts.component.html',
  styleUrls: ['./linked-accounts.component.scss']
})
export class LinkedAccountsComponent implements OnInit {
  accounts: any[] = [];
  @Output() accountSelected = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    const customerId = '123';  // Replace with dynamic customer ID
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/accounts/${customerId}`)
      .subscribe({
         next: data => this.accounts = data,
         error: err => console.error('Error loading linked accounts:', err)
      });
  }

  selectAccount(account: any): void {
    this.accountSelected.emit(account.id);
  }
}
