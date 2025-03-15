import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-audit-logs',
  templateUrl: './admin-audit-logs.component.html',
  styleUrls: ['./admin-audit-logs.component.scss']
})
export class AdminAuditLogsComponent implements OnInit {
  auditLogs: any[] = [];
  loading = false;
  errorMessage = '';
  searchForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs(searchTerm: string = ''): void {
    this.loading = true;
    this.errorMessage = '';
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/audit/logs`, { params })
      .subscribe({
        next: data => {
          this.auditLogs = data;
          this.loading = false;
        },
        error: err => {
          console.error('Error loading audit logs:', err);
          this.errorMessage = 'Failed to load audit logs. Please try again later.';
          this.loading = false;
        }
      });
  }

  onSearch(): void {
    const term = this.searchForm.get('searchTerm')?.value;
    this.loadAuditLogs(term);
  }
}
