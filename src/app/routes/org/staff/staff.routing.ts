import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff.component';

import { LeftComponent } from './left/left.component';
import { PendingComponent } from './pending/pending.component';
import { EmployedComponent } from './employed/employed.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    // redirectTo: 'pending',
    // pathMatch: 'full',
    children: [
      { path: 'pending', component: PendingComponent },
      { path: 'employed', component: EmployedComponent },
      { path: 'left', component: LeftComponent },
    ],
  },
];

export const staffRoutes = RouterModule.forChild(routes);
