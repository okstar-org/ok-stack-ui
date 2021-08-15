import { contactRoutes } from './contact.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, SharedModule, contactRoutes],
  declarations: [ContactComponent],
})
export class ContactModule {}
