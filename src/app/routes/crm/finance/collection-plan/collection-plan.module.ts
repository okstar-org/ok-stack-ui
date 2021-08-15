import { collectionPlanRoutes } from './collection-plan.routing';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPlanComponent } from './collection-plan.component';

@NgModule({
  imports: [CommonModule, SharedModule, collectionPlanRoutes],
  declarations: [CollectionPlanComponent],
})
export class CollectionPlanModule {}
