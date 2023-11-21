import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail.component';
import { InfoComponent } from './info/info.component';

const childrenRoutes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
];

const routes: Routes = [{ path: ':id', component: DetailComponent, children: childrenRoutes }];

export const detailRoutes = RouterModule.forChild(routes);
