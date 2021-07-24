import { TaskComponent } from './task/task.component';
import { AttachComponent } from './attach/attach.component';
import { CallComponent } from './call/call.component';
import { FollowupComponent } from './followup/followup.component';
import { InfoComponent } from './info/info.component';
import { DetailComponent } from './detail.component';
import { Routes, RouterModule } from '@angular/router';

const childrenRoutes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'followup', component: FollowupComponent },
  { path: 'task', component: TaskComponent },
  { path: 'call', component: CallComponent },
  { path: 'attach', component: AttachComponent },
];

const routes: Routes = [{ path: ':id', component: DetailComponent, children: childrenRoutes }];

export const detailRoutes = RouterModule.forChild(routes);
