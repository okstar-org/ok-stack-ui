import { Routes, RouterModule } from '@angular/router';
import { InitiateComponent } from './initiate.component';

const routes: Routes = [{ path: '', component: InitiateComponent }];

export const initiateRoutes = RouterModule.forChild(routes);
