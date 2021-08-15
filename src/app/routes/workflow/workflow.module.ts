import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { workflowRoutes } from './workflow.routing';
@NgModule({
  imports: [CommonModule, workflowRoutes],
  declarations: [WorkflowComponent],
})
export class WorkflowModule {}
