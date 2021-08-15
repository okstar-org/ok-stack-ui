import { OrderComponent } from './order.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: OrderComponent }];

export const orderRoutes = RouterModule.forChild(routes);
