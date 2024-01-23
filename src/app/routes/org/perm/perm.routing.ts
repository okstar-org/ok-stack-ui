import { Routes, RouterModule } from '@angular/router';

import { PermComponent } from './perm.component';

const routes: Routes = [
  {
    path: '',
    component: PermComponent,
  },
];

export const permRoutes = RouterModule.forChild(routes);
