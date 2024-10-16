import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '@shared';
import { BasicRoutes } from './settings.routing';

@NgModule({
  imports: [CommonModule, SharedModule, BasicRoutes],
  declarations: [SettingsComponent],
})
export class BasicModule {}
