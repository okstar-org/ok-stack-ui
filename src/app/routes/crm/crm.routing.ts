import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'saleslead', pathMatch: 'full' },
  {
    path: 'saleslead',
    loadChildren: () => import('./saleslead/saleslead.module').then(m => m.SalesleadModule),
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
  },
];

export const crmRoutes = RouterModule.forChild(routes);
