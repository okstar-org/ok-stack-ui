import { InstanceComponent } from './instance.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component: InstanceComponent   },
];

export const instanceRoutes = RouterModule.forChild(routes);
