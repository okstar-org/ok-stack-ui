import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { leadRoutes } from './lead.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, leadRoutes],
  entryComponents: [],
})
export class LeadModule {}
