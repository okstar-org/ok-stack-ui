import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { workRoutes } from './work.routing';
import { AppmgtComponent } from './appmgt/appmgt.component';
import { DetailComponent } from './detail/detail.component';
import { PayComponent } from './pay/pay.component';

@NgModule({
  imports: [CommonModule, SharedModule, workRoutes],
  declarations: [AppmgtComponent, DetailComponent, PayComponent],
})
export class WorkModule {}
