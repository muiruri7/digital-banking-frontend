import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-enhanced-deposit-withdraw',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.scss']
})
export class DepositWithdrawComponent {
  transactionForm: FormGroup;
  transactionType: 'deposit' | 'withdraw' = 'deposit';
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.transactionForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      return;
    }
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';
    const endpoint = `${environment.apiBaseUrl}/api/transactions/${this.transactionType}`;
    this.http.post(endpoint, this.transactionForm.value)
      .subscribe({
        next: data => {
          this.successMessage = `${this.transactionType.charAt(0).toUpperCase() + this.transactionType.slice(1)} successful.`;
          this.transactionForm.reset();
          this.submitting = false;
        },
        error: err => {
          console.error(`${this.transactionType} failed:`, err);
          this.errorMessage = `Error: ${this.transactionType} failed.`;
          this.submitting = false;
        }
      });
  }

  toggleTransactionType(): void {
    this.transactionType = this.transactionType === 'deposit' ? 'withdraw' : 'deposit';
    this.transactionForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
