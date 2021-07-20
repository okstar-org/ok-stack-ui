import { detailRoutes } from './detail.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';

@NgModule({
  imports: [CommonModule, detailRoutes],
  declarations: [DetailComponent],
})
export class DetailModule {}
