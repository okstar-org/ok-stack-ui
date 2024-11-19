import { Routes, RouterModule } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { RoleComponent } from './role/role.component';
import { ConfComponent } from './conf/conf.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'resource',
  },
  {
    path: 'resource',
    component: ResourceComponent,
  },
  {
    path: 'role',
    component: RoleComponent,
  },
  {
    path: 'conf',
    component: ConfComponent,
  },
];

export const permRoutes = RouterModule.forChild(routes);
