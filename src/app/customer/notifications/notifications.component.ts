import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  loading = false;
  errorMessage = '';
  customerId: string = '123'; // Replace with dynamic customer ID retrieval logic
  pollingSubscription!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
    // Set up auto-refresh every 30 seconds
    this.pollingSubscription = interval(30000).subscribe(() => {
      this.loadNotifications();
    });
  }

  loadNotifications(): void {
    this.loading = true;
    this.errorMessage = '';
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/notifications/${this.customerId}`)
      .subscribe({
        next: data => {
          this.notifications = data;
          this.loading = false;
        },
        error: err => {
          console.error('Error loading notifications:', err);
          this.errorMessage = 'Failed to load notifications.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
