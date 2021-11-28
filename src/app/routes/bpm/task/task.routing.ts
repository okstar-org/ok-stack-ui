import { TaskComponent } from './task.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: TaskComponent }];

export const taskRoutes = RouterModule.forChild(routes);
