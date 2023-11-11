import { DeptComponent } from './dept/dept.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgComponent } from './org.component';
import { SharedModule } from '@shared/shared.module';
import { orgRoutes } from './org.routing';
import { StaffComponent } from './staff/staff.component';

@NgModule({
  imports: [CommonModule, SharedModule, orgRoutes],
  declarations: [OrgComponent, DeptComponent, StaffComponent],
})
export class OrgModule {}