import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'history',
  },
  { path: 'history', component: HistoryComponent },
];

export const meetRoutes = RouterModule.forChild(routes);
