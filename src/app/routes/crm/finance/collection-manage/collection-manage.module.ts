import { collectionManageRoutes } from './collection-manage.routing';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionManageComponent } from './collection-manage.component';

@NgModule({
  imports: [CommonModule, SharedModule, collectionManageRoutes],
  declarations: [CollectionManageComponent],
})
export class CollectionManageModule {}
