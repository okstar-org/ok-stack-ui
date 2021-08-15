import { CollectionManageComponent } from './collection-manage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: CollectionManageComponent, pathMatch: 'full' }];

export const collectionManageRoutes = RouterModule.forChild(routes);
