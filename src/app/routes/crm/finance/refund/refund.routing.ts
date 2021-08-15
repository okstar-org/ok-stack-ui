import { RefundComponent } from './refund.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: RefundComponent, pathMatch: 'full' }];

export const refundRoutes = RouterModule.forChild(routes);
