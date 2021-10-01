import { SharedModule } from '@shared/shared.module';
import { sysRoutes } from './sys.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SharedModule, sysRoutes],
  declarations: [],
})
export class SysModule {}
