import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { meetRoutes } from './meet.routing';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [CommonModule, SharedModule, meetRoutes],
  declarations: [HistoryComponent],
})
export class MeetModule {}
