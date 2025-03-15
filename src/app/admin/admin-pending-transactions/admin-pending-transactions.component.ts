import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-pending-transactions',
  templateUrl: './admin-pending-transactions.component.html',
  styleUrls: ['./admin-pending-transactions.component.scss']
})
export class AdminPendingTransactionsComponent implements OnInit {
  transactions: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPendingTransactions();
  }

  loadPendingTransactions(): void {
    this.loading = true;
    this.errorMessage = '';
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/transactions/pending`)
      .subscribe({
        next: data => {
          this.transactions = data;
          this.loading = false;
        },
        error: err => {
          console.error('Error loading pending transactions:', err);
          this.errorMessage = 'Failed to load pending transactions. Please try again later.';
          this.loading = false;
        }
      });
  }

  approveTransaction(transaction: any): void {
    if (confirm(`Approve transaction ID ${transaction.id}?`)) {
      this.http.put(`${environment.apiBaseUrl}/api/transactions/${transaction.id}/approve`, {})
        .subscribe({
          next: () => {
            console.log('Transaction approved:', transaction);
            this.loadPendingTransactions();
          },
          error: err => {
            console.error('Error approving transaction:', err);
            alert('Failed to approve transaction.');
          }
        });
    }
  }

  rejectTransaction(transaction: any): void {
    if (confirm(`Reject transaction ID ${transaction.id}?`)) {
      this.http.put(`${environment.apiBaseUrl}/api/transactions/${transaction.id}/reject`, {})
        .subscribe({
          next: () => {
            console.log('Transaction rejected:', transaction);
            this.loadPendingTransactions();
          },
          error: err => {
            console.error('Error rejecting transaction:', err);
            alert('Failed to reject transaction.');
          }
        });
    }
  }
}
