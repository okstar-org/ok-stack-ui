import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { crmRoutes } from './crm.routing';

import { SalesleadComponent } from './saleslead/saleslead.component';
import { AddComponent } from './saleslead/dialog/add/add.component';
import { ImportComponent } from './saleslead/dialog/import/import.component';

@NgModule({
  declarations: [SalesleadComponent, AddComponent, ImportComponent],
  imports: [CommonModule, SharedModule, crmRoutes],
  entryComponents: [AddComponent, ImportComponent],
})
export class CrmModule {}
