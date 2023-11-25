import { RoomComponent } from './room.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: RoomComponent },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule),
  },
];

export const roomRoutes = RouterModule.forChild(routes);
