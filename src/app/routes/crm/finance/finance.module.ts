import { financeRoutes } from './finance.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, SharedModule, financeRoutes],
  declarations: [FinanceComponent],
})
export class FinanceModule {}
