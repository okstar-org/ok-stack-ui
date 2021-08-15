import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';

import { CollectionPlanService } from './collection-plan.service';
import { MtxGridColumn } from '@ng-matero/extensions';
import { OkPaginatorComponent } from '@shared/components/ok/ok-paginator.component';

@Component({
  selector: 'app-collection-plan',
  templateUrl: './collection-plan.component.html',
  styleUrls: ['./collection-plan.component.scss'],
  providers: [CollectionPlanService],
})
export class CollectionPlanComponent extends OkPaginatorComponent implements OnInit {
  group: FormGroup;
  backParams = {};

  list = [];
  total = 0;
  isLoading = true;
  rowSelectable = true;
  columnHideable = true;
  columnMovable = true;
  multiSelectable = true;
  showToolbar = true;
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('crm.collection-plan.name'),
      field: 'name',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.collection-plan.status'),
      field: 'state',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.collection-plan.mobilePhone'),
      field: 'mobilePhone',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.collection-plan.ownerName'),
      field: 'ownerName',
      sortable: true,
    },

    {
      header: this.translate.stream('crm.collection-plan.lastFollowUpTime'),
      field: 'lastFollowUpTime',
      sortable: true,
      type: 'date',
    },
    {
      header: this.translate.stream('crm.collection-plan.unFollowUpDays'),
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
          // click: record => this.delete(record),
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
          // click: record => this.top(record),
        },
      ],
    },
  ];

  searchControls = [
    {
      name: 'keyword',
      type: 'input',
      label: '关键词',
    },
    {
      name: 'collection-planStatus',
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

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: CollectionPlanService
  ) {
    super(fb, cdr, logger, svc, {});
  }

  ngOnInit() {
    this.getPage();
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }
  getBackParams(param) {
    return this.backParams[param];
  }
  edit(row: any) {}
}
