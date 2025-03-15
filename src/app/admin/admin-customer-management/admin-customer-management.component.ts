import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-customer-management',
  templateUrl: './admin-customer-management.component.html',
  styleUrls: ['./admin-customer-management.component.scss']
})
export class AdminCustomerManagementComponent implements OnInit {
  customers: any[] = [];
  selectedCustomer: any = null;
  updateForm!: FormGroup;
  isModalOpen: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.initializeForm();
  }

  loadCustomers(): void {
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/customers/all`)
      .subscribe({
        next: data => this.customers = data,
        error: err => console.error('Error loading customers:', err)
      });
  }

  initializeForm(): void {
    this.updateForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  openModal(customer: any): void {
    this.selectedCustomer = { ...customer };
    this.updateForm.patchValue({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address
    });
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCustomer = null;
    this.updateForm.reset();
  }

  onUpdate(): void {
    if (this.updateForm.valid && this.selectedCustomer) {
      const updatedCustomer = this.updateForm.getRawValue();
      this.http.put(`${environment.apiBaseUrl}/api/customers/${this.selectedCustomer.id}`, updatedCustomer)
        .subscribe({
          next: data => {
            console.log('Customer updated successfully', data);
            this.loadCustomers();
            this.closeModal();
          },
          error: err => console.error('Error updating customer:', err)
        });
    }
  }

  deactivateCustomer(customer: any): void {
    // Example: calling DELETE endpoint to deactivate customer.
    this.http.delete(`${environment.apiBaseUrl}/api/customers/${customer.id}`)
      .subscribe({
        next: data => {
          console.log('Customer deactivated successfully', data);
          this.loadCustomers();
        },
        error: err => console.error('Error deactivating customer:', err)
      });
  }
}
