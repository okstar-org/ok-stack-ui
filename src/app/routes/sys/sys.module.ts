import { SharedModule } from '@shared/shared.module';
import { sysRoutes } from './sys.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent, DialogComponent } from './dialog/dialog.component';

const COMPONENTS = [DialogComponent];
const COMPONENTS_DYNAMIC = [DialogDeleteComponent];

@NgModule({
  imports: [CommonModule, SharedModule, sysRoutes],
  declarations: [COMPONENTS, COMPONENTS_DYNAMIC],
})
export class SysModule {}
