import { approveRoutes } from './approve.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveComponent } from './approve.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, SharedModule, approveRoutes],
  declarations: [ApproveComponent],
})
export class ApproveModule {}
