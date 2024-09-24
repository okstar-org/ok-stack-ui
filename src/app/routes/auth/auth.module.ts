import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { permRoutes } from './auth.routing';
import { SharedModule } from '@shared';
import { ResourceComponent } from './resource/resource.component';
import { RoleComponent } from './role/role.component';
import { ConfComponent } from './conf/conf.component';

@NgModule({
  imports: [SharedModule, CommonModule, permRoutes],
  declarations: [ResourceComponent, RoleComponent, ConfComponent],
})
export class AuthModule {}
