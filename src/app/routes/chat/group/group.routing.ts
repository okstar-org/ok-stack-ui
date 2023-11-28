import { GroupComponent } from './group.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: GroupComponent }];

export const groupRoutes = RouterModule.forChild(routes);
