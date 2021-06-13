import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SalesleadComponent } from './saleslead/saleslead.component';

import { crmRoutes } from './crm.routing';

@NgModule({
  declarations: [SalesleadComponent],
  imports: [CommonModule, SharedModule, crmRoutes],
  entryComponents: [],
})
export class CrmModule {}
