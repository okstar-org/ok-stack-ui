import { SmsComponent } from '../../details/sms/sms.component';
import { TaskComponent } from '../../details/task/task.component';
import { AttachComponent } from '../../details/attach/attach.component';
import { CallComponent } from '../../details/call/call.component';
import { FollowupComponent } from '../../details/followup/followup.component';
import { InfoComponent } from './info/info.component';
import { DetailComponent } from './detail.component';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from '../../details/log/log.component';

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
