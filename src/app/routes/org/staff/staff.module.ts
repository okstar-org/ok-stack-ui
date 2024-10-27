import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { staffRoutes } from './staff.routing';
import { StaffComponent } from './staff.component';
import { EmployedComponent } from './employed/employed.component';
import { LeftComponent } from './left/left.component';
import { PendingComponent } from './pending/pending.component';
import { JoinDialogComponent } from './dialog-join/join-dialog.component';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';

@NgModule({
  imports: [CommonModule, SharedModule, staffRoutes],
  declarations: [
    StaffComponent,
    PendingComponent,
    EmployedComponent,
    LeftComponent,
    JoinDialogComponent,
    DialogAddComponent,
    DialogEditComponent,
  ],
})
export class StaffModule {}
