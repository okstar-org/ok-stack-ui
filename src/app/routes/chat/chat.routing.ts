import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then(m => m.RoomModule),
  },
];

export const chatRoutes = RouterModule.forChild(routes);
