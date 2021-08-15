import { orderRoutes } from './order.routing';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';

@NgModule({
  imports: [CommonModule, SharedModule, orderRoutes],
  declarations: [OrderComponent],
})
export class OrderModule {}
