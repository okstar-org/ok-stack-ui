import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './personal.component';

const routes: Routes = [{ path: '', component: PersonalComponent }];

export const BasicRoutes = RouterModule.forChild(routes);
