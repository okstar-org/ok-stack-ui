import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenComponent } from './open.component';
import { SharedModule } from '@shared';
import { OpenRoutes } from './open.routing';

@NgModule({
  imports: [CommonModule, SharedModule, OpenRoutes],
  declarations: [OpenComponent],
})
export class OpenModule {}
