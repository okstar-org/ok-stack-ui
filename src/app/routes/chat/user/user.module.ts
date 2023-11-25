import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userRoutes as userRoutes } from './user.routing';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

@NgModule({
  imports: [CommonModule, SharedModule, userRoutes],
  declarations: [UserComponent],
})
export class UserModule {}
