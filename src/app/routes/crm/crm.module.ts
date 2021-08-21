import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { crmRoutes } from './crm.routing';

import { LeadComponent } from './lead/lead.component';
import { AddComponent } from './lead/dialog/add/add.component';
import { ImportComponent } from './lead/dialog/import/import.component';

@NgModule({
  declarations: [LeadComponent, AddComponent, ImportComponent],
  imports: [CommonModule, SharedModule, crmRoutes],
  entryComponents: [AddComponent, ImportComponent],
})
export class CrmModule {}
