import { CostComponent } from './cost.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: CostComponent, pathMatch: 'full' }];

export const costRoutes = RouterModule.forChild(routes);
