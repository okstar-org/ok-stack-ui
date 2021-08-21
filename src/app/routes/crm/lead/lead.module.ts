import { salesleadRoutes } from './lead.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, salesleadRoutes],
  entryComponents: [],
})
export class LeadModule {}
