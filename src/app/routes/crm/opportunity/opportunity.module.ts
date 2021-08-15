import { opportunityRoutes } from './opportunity.routing';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityComponent } from './opportunity.component';

@NgModule({
  imports: [CommonModule, SharedModule, opportunityRoutes],
  declarations: [OpportunityComponent],
})
export class OpportunityModule {}
