import { InvoiceComponent } from './invoice.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: InvoiceComponent, pathMatch: 'full' }];

export const invoiceRoutes = RouterModule.forChild(routes);
