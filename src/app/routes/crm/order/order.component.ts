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
      name: 'customerStatus',
      type: 'select',
      label: '客户状态',
      select: [
        { name: 'Understanding', text: '了解产品' },
        { name: 'FollowingUp', text: '正在跟进' },
        { name: 'OnTrial', text: '正在试用' },
        { name: 'ReadyToBuy', text: '准备购买' },
        { name: 'PrepareForPayment', text: '准备付款' },
        { name: 'AlreadyPurchased', text: '已经购买' },
        { name: 'PutItOnHold', text: '暂时搁置' },
      ],
    },
    {
      name: 'lastFollowUpTime',
      type: 'date',
      label: '最后跟进',
    },
  ];

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('crm.saleslead.customerName'),
      field: 'customerName',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.contactName'),
      field: 'contactName',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.mobilePhone'),
      field: 'mobilePhone',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.ownerName'),
      field: 'ownerName',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.leadFrom'),
      field: 'leadFrom',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.leadState'),
      field: 'leadState',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.lastFollowUpTime'),
      field: 'lastFollowUpTime',
      sortable: true,
      type: 'date',
    },
    {
      header: this.translate.stream('crm.saleslead.unFollowUpDays'),
      field: 'unFollowUpDays',
      sortable: true,
      type: 'number',
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
          type: 'icon',
          icon: 'chat',
          text: '跟进',
          popTitle: '跟进',
          tooltip: '跟进',
        },
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
          text: '置顶',
          tooltip: '置顶',
          // pop: true,
          // popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          // popCloseText: this.translate.stream('table_kitchen_sink.close'),
          // popOkText: this.translate.stream('table_kitchen_sink.ok'),
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
    });
  }

  ngOnInit() {}

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
