import { Routes, RouterModule } from '@angular/router';
import { IntegrationComponent } from './integration.component';

const routes: Routes = [{ path: '', component: IntegrationComponent }];

export const BasicRoutes = RouterModule.forChild(routes);
