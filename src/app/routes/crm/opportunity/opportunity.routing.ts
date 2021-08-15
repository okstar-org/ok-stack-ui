import { OpportunityComponent } from './opportunity.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: OpportunityComponent }];

export const opportunityRoutes = RouterModule.forChild(routes);
