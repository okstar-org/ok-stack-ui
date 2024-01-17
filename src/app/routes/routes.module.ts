import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ForgotComponent } from './sessions/forgot/forgot.component';

const COMPONENTS = [DashboardComponent, LoginComponent, RegisterComponent, ForgotComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule, CdkTableModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class RoutesModule {}
