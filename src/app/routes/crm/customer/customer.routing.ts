import { CustomerComponent } from './customer.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: CustomerComponent }];

export const customerRoutes = RouterModule.forChild(routes);
