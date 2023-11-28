import { Routes, RouterModule } from '@angular/router';
import { AppmgtComponent } from './appmgt/appmgt.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  { path: 'app', component: AppmgtComponent },
];

export const platformRoutes = RouterModule.forChild(routes);
