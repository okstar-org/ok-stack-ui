import { SharedModule } from './../../../../shared/shared.module';
import { refundRoutes } from './refund.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundComponent } from './refund.component';

@NgModule({
  imports: [CommonModule, SharedModule, refundRoutes],
  declarations: [RefundComponent],
})
export class RefundModule {}
