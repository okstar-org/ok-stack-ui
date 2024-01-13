import { Routes, RouterModule } from '@angular/router';
import { AppmgtComponent } from './appmgt/appmgt.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  { path: 'app', component: AppmgtComponent },
  { path: 'app/:id', component: DetailComponent },
];

export const workRoutes = RouterModule.forChild(routes);
