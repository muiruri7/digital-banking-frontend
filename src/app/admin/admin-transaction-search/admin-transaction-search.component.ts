import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-transaction-search',
  templateUrl: './admin-transaction-search.component.html',
  styleUrls: ['./admin-transaction-search.component.scss']
})
export class AdminTransactionSearchComponent implements OnInit {
  searchForm: FormGroup;
  transactions: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      dateFrom: [''],
      dateTo: [''],
      type: [''],    // e.g., 'deposit', 'withdraw', 'transfer'
      minAmount: [''],
      maxAmount: ['']
    });
  }

  ngOnInit(): void {
    // Optionally, load all transactions initially.
    this.searchTransactions();
  }

  searchTransactions(): void {
    this.loading = true;
    this.errorMessage = '';
    let params = new HttpParams();
    const formValues = this.searchForm.value;
    
    if (formValues.dateFrom) {
      params = params.set('dateFrom', formValues.dateFrom);
    }
    if (formValues.dateTo) {
      params = params.set('dateTo', formValues.dateTo);
    }
    if (formValues.type) {
      params = params.set('type', formValues.type);
    }
    if (formValues.minAmount) {
      params = params.set('minAmount', formValues.minAmount);
    }
    if (formValues.maxAmount) {
      params = params.set('maxAmount', formValues.maxAmount);
    }
    
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/transactions/search`, { params })
      .subscribe({
        next: data => {
          this.transactions = data;
          this.loading = false;
        },
        error: err => {
          console.error('Error searching transactions:', err);
          this.errorMessage = 'Failed to load transactions.';
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    this.searchTransactions();
  }
}
