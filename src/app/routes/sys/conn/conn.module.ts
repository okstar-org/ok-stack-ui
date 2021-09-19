import { FsComponent } from './fs/fs.component';
import { DtComponent } from './dt/dt.component';
import { WxComponent } from './wx/wx.component';
import { connRoutes } from './conn.routing';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnComponent } from './conn.component';

@NgModule({
  imports: [CommonModule, SharedModule, connRoutes],
  declarations: [ConnComponent, WxComponent, DtComponent, FsComponent],
})
export class ConnModule {}
