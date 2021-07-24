import { customerRoutes } from './customer.routing';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';

@NgModule({
  imports: [CommonModule, SharedModule, customerRoutes],
  declarations: [CustomerComponent],
})
export class CustomerModule {}
