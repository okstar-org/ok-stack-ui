import { ModelComponent } from './model.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'', component: ModelComponent },
];

export const modelRoutes = RouterModule.forChild(routes);
