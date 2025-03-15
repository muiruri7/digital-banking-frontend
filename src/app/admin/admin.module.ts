import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCustomerManagementComponent } from './admin-customer-management/admin-customer-management.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import { AdminPendingTransactionsComponent } from './admin-pending-transactions/admin-pending-transactions.component';
import { AdminAuditLogsComponent } from './admin-audit-logs/admin-audit-logs.component';
import { AdminTransactionSearchComponent } from './admin-transaction-search/admin-transaction-search.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminCustomerManagementComponent,
    AdminAccountManagementComponent,
    AdminPendingTransactionsComponent,
    AdminAuditLogsComponent,
    AdminTransactionSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
