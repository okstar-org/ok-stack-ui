import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { DetailComponent } from './order/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'order',
  },
  { path: 'order', component: OrderComponent },
  { path: 'order/:id', component: DetailComponent },
];

export const billingRoutes = RouterModule.forChild(routes);
