import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { platformRoutes } from './work.routing';
import { AppmgtComponent } from './appmgt/appmgt.component';
import { DetailComponent } from './detail/detail.component';
import { PayComponent } from './pay/pay.component';

@NgModule({
  imports: [CommonModule, SharedModule, platformRoutes],
  declarations: [AppmgtComponent, DetailComponent, PayComponent],
})
export class WorkModule {}
