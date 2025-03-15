import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCustomerManagementComponent } from './admin-customer-management/admin-customer-management.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import { AdminPendingTransactionsComponent } from './admin-pending-transactions/admin-pending-transactions.component';
import { AdminAuditLogsComponent } from './admin-audit-logs/admin-audit-logs.component';
import { AdminTransactionSearchComponent } from './admin-transaction-search/admin-transaction-search.component';
import { AdminGuard } from '../authentication/admin.guard';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'customers', component: AdminCustomerManagementComponent, canActivate: [AdminGuard] },
  { path: 'accounts', component: AdminAccountManagementComponent, canActivate: [AdminGuard] },
  { path: 'transactions', component: AdminPendingTransactionsComponent, canActivate: [AdminGuard] },
  { path: 'audit-logs', component: AdminAuditLogsComponent, canActivate: [AdminGuard] },
  { path: 'transaction-search', component: AdminTransactionSearchComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }