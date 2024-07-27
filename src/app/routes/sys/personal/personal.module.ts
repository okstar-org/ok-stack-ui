import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { SharedModule } from '@shared';
import { BasicRoutes } from './personal.routing';

@NgModule({
  imports: [CommonModule, SharedModule, BasicRoutes],
  declarations: [PersonalComponent],
})
export class BasicModule {}
