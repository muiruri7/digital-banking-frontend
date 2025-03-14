import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  customerData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Replace this with logic to get the logged-in customer's id.
    const customerId = '123'; 
    this.http.get(`${environment.apiBaseUrl}/api/customers/${customerId}`)
      .subscribe({
        next: data => this.customerData = data,
        error: error => console.error('Error loading customer profile:', error)
      });
  }
}
