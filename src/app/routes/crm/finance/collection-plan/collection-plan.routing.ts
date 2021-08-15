import { CollectionPlanComponent } from './collection-plan.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: CollectionPlanComponent }];

export const collectionPlanRoutes = RouterModule.forChild(routes);
