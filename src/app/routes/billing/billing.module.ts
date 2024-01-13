import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { billingRoutes } from './billing.routing';
import { DetailComponent } from './order/detail/detail.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [CommonModule, SharedModule, billingRoutes],
  declarations: [DetailComponent, OrderComponent],
})
export class BillingModule {}
