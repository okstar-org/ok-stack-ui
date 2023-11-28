import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { SharedModule } from '@shared';
import { BasicRoutes } from './basic.routing';

@NgModule({
  imports: [CommonModule, SharedModule, BasicRoutes],
  declarations: [BasicComponent],
})
export class BasicModule {}
