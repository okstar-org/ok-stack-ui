import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { InfoComponent } from './info/info.component';
import { detailRoutes } from './detail.routing';
import { ContactComponent } from '../../details/contact/contact.component';
import { OpportunityComponent } from '../../details/opportunity/opportunity.component';
import { InvoiceComponent } from '../../details/invoice/invoice.component';
import { OrderComponent } from '../../details/order/order.component';
import { CostComponent } from '../../details/cost/cost.component';
import { OwnerLogComponent } from '../../details/owner-log/owner-log.component';

@NgModule({
  imports: [CommonModule, SharedModule, detailRoutes],
  declarations: [
    DetailComponent,
    InfoComponent,
    ContactComponent,
    OpportunityComponent,
    InvoiceComponent,
    OrderComponent,
    CostComponent,
    OwnerLogComponent,
  ],
})
export class DetailModule {}
