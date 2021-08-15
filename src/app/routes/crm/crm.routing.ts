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
  {
    path: 'opportunity',
    loadChildren: () => import('./opportunity/opportunity.module').then(m => m.OpportunityModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'finance',
    loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule),
  },
];

export const crmRoutes = RouterModule.forChild(routes);
