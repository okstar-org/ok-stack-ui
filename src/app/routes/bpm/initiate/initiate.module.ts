import { InitiateComponent } from './initiate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { initiateRoutes } from './initiate.routing';

@NgModule({
  imports: [CommonModule, SharedModule, initiateRoutes],
  declarations: [InitiateComponent],
})
export class InitiateModule {}
