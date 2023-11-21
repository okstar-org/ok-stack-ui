import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { chatRoutes } from './chat.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, chatRoutes],
})
export class ChatModule {}
