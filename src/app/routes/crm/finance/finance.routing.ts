import { FinanceComponent } from './finance.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children: [
      {
        path: '',
        redirectTo: 'collection-plan',
        pathMatch: 'full',
      },
      {
        path: 'collection-plan',
        loadChildren: () =>
          import('./collection-plan/collection-plan.module').then(m => m.CollectionPlanModule),
      },
      {
        path: 'collection-manage',
        loadChildren: () =>
          import('./collection-manage/collection-manage.module').then(
            m => m.CollectionManageModule
          ),
      },
      {
        path: 'cost',
        loadChildren: () => import('./cost/cost.module').then(m => m.CostModule),
      },
      {
        path: 'refund',
        loadChildren: () => import('./refund/refund.module').then(m => m.RefundModule),
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
      },
    ],
  },
];

export const financeRoutes = RouterModule.forChild(routes);
