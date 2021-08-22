import { LogComponent } from '../../details/log/log.component';
import { Routes, RouterModule } from '@angular/router';
import { CallComponent } from '../../details/call/call.component';
import { DetailComponent } from './detail.component';
import { InfoComponent } from './info/info.component';
import { FollowupComponent } from '../../details/followup/followup.component';
import { TaskComponent } from '../../details/task/task.component';
import { SmsComponent } from '../../details/sms/sms.component';
import { AttachComponent } from '../../details/attach/attach.component';
import { ContactComponent } from '../../details/contact/contact.component';
import { OpportunityComponent } from '../../details/opportunity/opportunity.component';
import { OrderComponent } from '../../details/order/order.component';
import { InvoiceComponent } from '../../details/invoice/invoice.component';
import { CostComponent } from '../../details/cost/cost.component';
import { OwnerLogComponent } from '../../details/owner-log/owner-log.component';

const childrenRoutes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'followup', component: FollowupComponent },
  { path: 'task', component: TaskComponent },
  { path: 'call', component: CallComponent },
  { path: 'attach', component: AttachComponent },
  { path: 'sms', component: SmsComponent },
  { path: 'log', component: LogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'opportunity', component: OpportunityComponent },
  { path: 'order', component: OrderComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'cost', component: CostComponent },
  { path: 'owner-log', component: OwnerLogComponent },
];

const routes: Routes = [{ path: ':id', component: DetailComponent, children: childrenRoutes }];

export const detailRoutes = RouterModule.forChild(routes);
