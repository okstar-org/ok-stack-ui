import { DetailComponent } from './detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '',  red},
  { path: ':id', component: DetailComponent },
];

export const detailRoutes = RouterModule.forChild(routes);
