import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { staffRoutes } from './staff.routing';
import { StaffComponent } from './staff.component';
import { EmployedComponent } from './employed/employed.component';
import { LeftComponent } from './left/left.component';
import { PendingComponent } from './pending/pending.component';

@NgModule({
  imports: [CommonModule, SharedModule, staffRoutes],
  declarations: [StaffComponent, PendingComponent, EmployedComponent, LeftComponent],
})
export class StaffModule {}
