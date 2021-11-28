import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BPMComponent } from './bpm.component';
import { bpmRoutes } from './bpm.routing';
@NgModule({
  imports: [CommonModule, bpmRoutes],
  declarations: [BPMComponent],
})
export class WorkflowModule {}
