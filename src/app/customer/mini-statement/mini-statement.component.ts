import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.scss']
})
export class MiniStatementComponent implements OnInit {
  accountId: string | null = null;
  transactions: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountId = params.get('accountId');
      if (this.accountId) {
        this.loadTransactions(this.accountId);
      }
    });
  }

  loadTransactions(accountId: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/transactions/account/${accountId}`)
      .subscribe({
        next: data => {
          this.transactions = data;
          this.loading = false;
        },
        error: err => {
          console.error('Error loading transactions:', err);
          this.errorMessage = 'Failed to load transactions.';
          this.loading = false;
        }
      });
  }

  refresh(): void {
    if (this.accountId) {
      this.loadTransactions(this.accountId);
    }
  }
}
