import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { roomRoutes as roomRoutes } from './room.routing';
import { RoomComponent } from './room.component';

@NgModule({
  imports: [CommonModule, SharedModule, roomRoutes],
  declarations: [RoomComponent],
})
export class RoomModule {}
