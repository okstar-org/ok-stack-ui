import { DeptComponent } from './dept/dept.component';
import { OrgComponent } from './org.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dept',
  },
  { path: 'dept', component: DeptComponent },
];

export const orgRoutes = RouterModule.forChild(routes);
