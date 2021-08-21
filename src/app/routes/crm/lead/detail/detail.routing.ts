import { SmsComponent } from './sms/sms.component';
import { TaskComponent } from './task/task.component';
import { AttachComponent } from './attach/attach.component';
import { CallComponent } from './call/call.component';
import { FollowupComponent } from './followup/followup.component';
import { InfoComponent } from './info/info.component';
import { DetailComponent } from './detail.component';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './log/log.component';

const childrenRoutes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'followup', component: FollowupComponent },
  { path: 'task', component: TaskComponent },
  { path: 'call', component: CallComponent },
  { path: 'attach', component: AttachComponent },
  { path: 'sms', component: SmsComponent },
  { path: 'log', component: LogComponent },
];

const routes: Routes = [{ path: ':id', component: DetailComponent, children: childrenRoutes }];

export const detailRoutes = RouterModule.forChild(routes);
