import { OrgComponent } from './org/org.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'org', pathMatch: 'full' },
  { path: 'org', component: OrgComponent },
];

export const sysRoutes = RouterModule.forChild(routes);
