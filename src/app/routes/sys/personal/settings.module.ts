import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '@shared';
import { BasicRoutes } from './settings.routing';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  imports: [CommonModule, SharedModule, FileUploadModule, BasicRoutes],
  declarations: [SettingsComponent],
})
export class BasicModule {}
