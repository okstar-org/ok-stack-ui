import { SharedModule } from './../../../../shared/shared.module';
import { costRoutes } from './cost.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostComponent } from './cost.component';

@NgModule({
  imports: [CommonModule, SharedModule, costRoutes],
  declarations: [CostComponent],
})
export class CostModule {}
