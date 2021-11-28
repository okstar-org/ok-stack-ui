import { taskRoutes } from './task.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { TaskComponent } from './task.component';

@NgModule({
  imports: [CommonModule, SharedModule, taskRoutes],
  declarations: [TaskComponent],
})
export class TaskModule {}
