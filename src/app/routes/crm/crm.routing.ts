import { Routes, RouterModule } from '@angular/router';
import { SalesleadComponent } from './saleslead/saleslead.component';

const routes: Routes = [{ path: 'saleslead', component: SalesleadComponent }];

export const crmRoutes = RouterModule.forChild(routes);
