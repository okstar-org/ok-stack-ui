import { ConnComponent } from './conn/conn.component';
import { OrgComponent } from './org/org.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'org', pathMatch: 'full' },
  { path: 'conn', loadChildren: () => import('./conn/conn.module').then(m => m.ConnModule) },
  { path: 'org', component: OrgComponent },
];

export const sysRoutes = RouterModule.forChild(routes);
