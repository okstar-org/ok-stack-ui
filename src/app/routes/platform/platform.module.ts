import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { platformRoutes } from './platform.routing';
import { AppmgtComponent } from './appmgt/appmgt.component';

@NgModule({
  imports: [CommonModule, SharedModule, platformRoutes],
  declarations: [AppmgtComponent],
})
export class PlatformModule {}
