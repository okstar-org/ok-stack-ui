import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { InstanceComponent } from './instance.component';
import { instanceRoutes } from './instance.routing';

@NgModule({
  imports: [CommonModule, SharedModule, instanceRoutes],
  declarations: [InstanceComponent],
})
export class InstanceModule {}
