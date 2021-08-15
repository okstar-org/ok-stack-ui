import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '@shared';
import { invoiceRoutes } from './invoice.routing';

@NgModule({
  imports: [CommonModule, SharedModule, invoiceRoutes],
  declarations: [InvoiceComponent],
})
export class InvoiceModule {}
