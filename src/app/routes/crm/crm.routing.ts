import { DetailModule } from './saleslead/detail/detail.module';
import { Routes, RouterModule } from '@angular/router';
import { SalesleadComponent } from './saleslead/saleslead.component';

const routes: Routes = [
  { path: '', redirectTo: 'saleslead', pathMatch: 'full' },
  // { path: 'saleslead', component: SalesleadComponent },
  {
    path: 'saleslead',
    loadChildren: () => import('./saleslead/saleslead.module').then(m => m.SalesleadModule),
  },
  // { path: 'saleslead/detail', loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)}
];

export const crmRoutes = RouterModule.forChild(routes);
