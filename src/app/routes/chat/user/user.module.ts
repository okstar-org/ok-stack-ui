import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { customerRoutes } from './user.routing';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

@NgModule({
  imports: [CommonModule, SharedModule, customerRoutes],
  declarations: [UserComponent],
})
export class CustomerModule {}
