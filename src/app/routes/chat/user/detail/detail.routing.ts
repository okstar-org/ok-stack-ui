import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';

const childrenRoutes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'contact', component: ContactComponent },
];

const routes: Routes = [{ path: ':id', component: DetailComponent, children: childrenRoutes }];

export const detailRoutes = RouterModule.forChild(routes);
