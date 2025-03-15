import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent {
  transferForm: FormGroup;
  submitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.transferForm = this.fb.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      return;
    }
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    this.http.post(`${environment.apiBaseUrl}/api/transactions/transfer`, this.transferForm.value)
      .subscribe({
        next: () => {
          this.successMessage = 'Transfer completed successfully.';
          this.transferForm.reset();
          this.submitting = false;
        },
        error: err => {
          console.error('Transfer failed:', err);
          this.errorMessage = 'Transfer failed. Please try again.';
          this.submitting = false;
        }
      });
  }
}
