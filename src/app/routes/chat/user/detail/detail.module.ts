import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { InfoComponent } from './info/info.component';
import { detailRoutes } from './detail.routing';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [CommonModule, SharedModule, detailRoutes],
  declarations: [DetailComponent, InfoComponent, ContactComponent],
})
export class DetailModule {}
