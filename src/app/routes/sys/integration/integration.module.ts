import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationComponent } from './integration.component';
import { SharedModule } from '@shared';
import { BasicRoutes } from './integration.routing';

@NgModule({
  imports: [CommonModule, SharedModule, BasicRoutes],
  declarations: [IntegrationComponent],
})
export class IntegrationModule {}
