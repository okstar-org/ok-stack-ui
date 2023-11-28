import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { groupRoutes as groupRoutes } from './group.routing';
import { GroupComponent } from './group.component';

@NgModule({
  imports: [CommonModule, SharedModule, groupRoutes],
  declarations: [GroupComponent],
})
export class GroupModule {}
