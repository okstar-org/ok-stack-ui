import { DeptComponent } from './dept/dept.component';
import { StaffComponent } from './staff/staff.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dept',
  },
  { path: 'dept', component: DeptComponent },
  { path: 'staff', component: StaffComponent },
];

export const orgRoutes = RouterModule.forChild(routes);
