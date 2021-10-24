import { OkPaginatorComponent } from './../../../shared/components/ok/ok-paginator.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './order.service';
import { MtxGridColumn } from '@ng-matero/extensions';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent extends OkPaginatorComponent implements OnInit {
  searchControls = [
    {
      name: 'keyword',
      type: 'input',
      label: '关键词',
    },
    {
      name: 'sn',
      type: 'input',
      label: '编号',
    },
    {
      name: 'name',
      type: 'input',
      label: '名称',
    },
  ];

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('crm.order.sn'),
      field: 'sn',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.order.name'),
      field: 'name',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.order.customer'),
      field: 'customer',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.order.amount'),
      field: 'amount',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.order.collectedAmount'),
      field: 'collectedAmount',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.order.invoicedAmount'),
      field: 'invoicedAmount',
      sortable: true,
    },

    {
      header: '操作',
      field: 'operation',
      minWidth: 180,
      width: '200px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'primary',
          icon: 'edit',
          text: this.translate.stream('table_kitchen_sink.edit'),
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
          // pop: true,
          // popTitle: this.translate.stream('table_kitchen_sink.edit'),
          // popCloseText: this.translate.stream('table_kitchen_sink.edit'),
          // popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.edit(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          popCloseText: this.translate.stream('table_kitchen_sink.close'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.delete(record),
        },
        {
          color: 'accent',
          icon: 'arrow_upward',
          text: this.translate.stream('table_common_fields.top'),
          tooltip: this.translate.stream('table_common_fields.top'),
          click: record => this.top(record),
        },
      ],
    },
  ];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: OrderService
  ) {
    super(fb, cdr, logger, svc, {
      keyword: '',
      sn: '',
      name: '',
    });
  }

  ngOnInit() {
    this.getPage();
  }

  add() {}

  edit(data: any) {
    this.logger.debug('edit...', data);
  }

  import() {
    this.logger.debug('import...');
  }

  export() {
    this.logger.debug('export...');
  }
}
