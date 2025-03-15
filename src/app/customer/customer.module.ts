import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { LinkedAccountsComponent } from './linked-accounts/linked-accounts.component';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { DepositWithdrawComponent } from './deposit-withdraw/deposit-withdraw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TransactionFilterComponent } from './transaction-filter/transaction-filter.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomerProfileComponent,
    LinkedAccountsComponent,
    MiniStatementComponent,
    DepositWithdrawComponent,
    TransferFundsComponent,
    NotificationsComponent,
    TransactionFilterComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerDashboardComponent
  ]
})
export class CustomerModule { }
