import { TranslateService } from '@ngx-translate/core';
import { OkPaginatorComponent } from '../../../shared/components/ok/ok-paginator.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { NGXLogger } from 'ngx-logger';

import { OpportunityService } from './opportunity.service';
import { MtxGridColumn } from '@ng-matero/extensions';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
  providers: [OpportunityService],
})
export class OpportunityComponent extends OkPaginatorComponent implements OnInit {
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
      header: this.translate.stream('crm.opportunity.name'),
      field: 'name',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.opportunity.phase'),
      field: 'phase',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.opportunity.priceList'),
      field: 'priceList',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.opportunity.priceAmount'),
      field: 'priceAmount',
      sortable: true,
    },

    {
      header: this.translate.stream('crm.opportunity.lastFollowUpTime'),
      field: 'lastFollowUpTime',
      sortable: true,
      type: 'date',
    },
    {
      header: this.translate.stream('crm.opportunity.unFollowUpDays'),
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
      name: 'opportunityStatus',
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
    protected svc: OpportunityService
  ) {
    super(fb, cdr, logger, svc, {
      keyword: '',
      ownerName: '',
      leadStatus: '',
      leadFrom: '',
      lastFollowUpTime: [null],
      lastFollowUpTime2: [null],
      opportunityStatus: '',
    });
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
  add() {}

  import() {}

  edit(data: any) {}

  export() {
    // if (!supports.canDownload()) {
    //   this.translate.get('support.can_not').subscribe(r => {
    //     alert(r);
    //   });
    //   return;
    // }
    // this.service.getExport(this.params, '客户管理-销售线索-导出.xls');
  }

  change() {}

  newTask() {}

  sendMessage() {}

  reset() {}

  search() {}
}
