import { TaskComponent } from './task/task.component';
import { SharedModule } from './../../../../shared/shared.module';
import { AttachComponent } from './attach/attach.component';
import { CallComponent } from './call/call.component';
import { FollowupComponent } from './followup/followup.component';
import { InfoComponent } from './info/info.component';
import { detailRoutes } from './detail.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';

@NgModule({
  imports: [CommonModule, SharedModule, detailRoutes],
  declarations: [
    DetailComponent,
    InfoComponent,
    FollowupComponent,
    TaskComponent,
    CallComponent,
    AttachComponent,
  ],
})
export class DetailModule {}
