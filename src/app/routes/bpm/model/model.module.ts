import { modelRoutes } from './model.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './model.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, SharedModule, modelRoutes],
  declarations: [ModelComponent],
})
export class ModelModule {}
