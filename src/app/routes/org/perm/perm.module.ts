import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermComponent } from './perm.component';
import { permRoutes } from './perm.routing';
import { SharedModule } from '@shared';

@NgModule({
  imports: [SharedModule, CommonModule, permRoutes],
  declarations: [PermComponent],
})
export class PermModule {}
