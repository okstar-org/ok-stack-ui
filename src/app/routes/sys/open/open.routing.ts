import { Routes, RouterModule } from '@angular/router';
import { OpenComponent } from './open.component';

const routes: Routes = [{ path: '', component: OpenComponent }];

export const OpenRoutes = RouterModule.forChild(routes);
