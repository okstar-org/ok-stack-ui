import { ApproveComponent } from './approve.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: ApproveComponent }];

export const approveRoutes = RouterModule.forChild(routes);
