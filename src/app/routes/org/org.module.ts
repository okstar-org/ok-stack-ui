import { DeptComponent } from './dept/dept.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { orgRoutes } from './org.routing';
import { AddPostComponent } from './dept/add-post/add-post.component';

@NgModule({
  imports: [CommonModule, SharedModule, orgRoutes],
  declarations: [DeptComponent, AddPostComponent],
})
export class OrgModule {}
