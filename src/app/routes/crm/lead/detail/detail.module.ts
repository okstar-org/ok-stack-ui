import { LogComponent } from '../../details/log/log.component';
import { SmsComponent } from '../../details/sms/sms.component';
import { TaskComponent } from '../../details/task/task.component';
import { SharedModule } from './../../../../shared/shared.module';
import { AttachComponent } from '../../details/attach/attach.component';
import { CallComponent } from '../../details/call/call.component';
import { FollowupComponent } from '../../details/followup/followup.component';
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
    SmsComponent,
    LogComponent,
  ],
})
export class DetailModule {}
