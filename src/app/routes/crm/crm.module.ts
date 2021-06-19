import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SalesleadComponent } from './saleslead/saleslead.component';

import { crmRoutes } from './crm.routing';
import { AddComponent } from './saleslead/dialog/add/add.component';

@NgModule({
  declarations: [SalesleadComponent, AddComponent],
  imports: [CommonModule, SharedModule, crmRoutes],
  entryComponents: [AddComponent],
})
export class CrmModule {}
