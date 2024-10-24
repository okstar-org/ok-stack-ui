import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '@shared';
import { BasicRoutes } from './settings.routing';
import { MtxPhotoviewerModule } from '@ng-matero/extensions/photoviewer';

@NgModule({
  imports: [CommonModule, SharedModule, BasicRoutes, MtxPhotoviewerModule],
  declarations: [SettingsComponent],
})
export class BasicModule {}
