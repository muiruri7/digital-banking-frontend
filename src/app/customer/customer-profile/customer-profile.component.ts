import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  profile: any;
  editForm!: FormGroup;
  isEditModalOpen = false;
  loading = false;
  error = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProfile();
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  loadProfile(): void {
    const customerId = '123'; // Replace with dynamic customer ID
    this.loading = true;
    this.http.get(`${environment.apiBaseUrl}/api/customers/${customerId}`)
      .subscribe({
        next: data => {
          this.profile = data;
          this.loading = false;
          // Populate form fields
          this.editForm.patchValue({
            name: this.profile.name,
            email: this.profile.email,
            phone: this.profile.phone,
            address: this.profile.address
          });
        },
        error: err => {
          console.error('Error loading profile:', err);
          this.error = 'Failed to load profile.';
          this.loading = false;
        }
      });
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  onSaveProfile(): void {
    if (this.editForm.valid && this.profile) {
      const updatedProfile = { ...this.profile, ...this.editForm.getRawValue() };
      this.http.put(`${environment.apiBaseUrl}/api/customers/${this.profile.id}`, updatedProfile)
        .subscribe({
          next: data => {
            console.log('Profile updated:', data);
            this.profile = data;
            this.closeEditModal();
          },
          error: err => {
            console.error('Error updating profile:', err);
            this.error = 'Failed to update profile.';
          }
        });
    }
  }
}
