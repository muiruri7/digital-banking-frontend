import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent {
  filterForm: FormGroup;
  @Output() filterChanged = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      dateFrom: [''],
      dateTo: [''],
      type: [''],    // e.g., 'deposit', 'withdraw', 'transfer'
      minAmount: [''],
      maxAmount: ['']
    });
  }

  onFilter(): void {
    this.filterChanged.emit(this.filterForm.value);
  }
}
