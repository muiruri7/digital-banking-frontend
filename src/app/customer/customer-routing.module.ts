import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { LinkedAccountsComponent } from './linked-accounts/linked-accounts.component';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { DepositWithdrawComponent } from './deposit-withdraw/deposit-withdraw.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TransactionFilterComponent } from './transaction-filter/transaction-filter.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent,
    children: [
      { path: 'profile', component: CustomerProfileComponent },
      { path: 'accounts', component: LinkedAccountsComponent },
      { path: 'mini-statement/:accountId', component: MiniStatementComponent },
      { path: 'deposit-withdraw', component: DepositWithdrawComponent },
      { path: 'transfer', component: TransferFundsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'transaction-filter', component: TransactionFilterComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
