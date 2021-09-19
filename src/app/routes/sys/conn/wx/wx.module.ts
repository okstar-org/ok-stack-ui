import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WxComponent } from './wx.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [WxComponent],
})
export class WxModule {}
