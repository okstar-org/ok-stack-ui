import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MtxGridColumn } from '@ng-matero/extensions';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent extends OkDetailComponent implements OnInit {
  searchControls = [
    {
      name: 'keyword',
      type: 'input',
      label: '关键词',
    },
    {
      name: 'beginTime',
      type: 'date',
      label: '开始时间',
    },
    {
      name: 'endTime',
      type: 'date',
      label: '截至时间',
    },
  ];

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('crm.invoice.name'),
      field: 'name',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.invoice.estimateAmount'),
      field: 'estimateAmount',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.invoice.estimateDate'),
      field: 'estimateDate',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.invoice.phase'),
      field: 'phase',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.invoice.dealProbability'),
      field: 'dealProbability',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.invoice.createdAt'),
      field: 'createdAt',
      sortable: true,
    },
    {
      header: this.translate.stream('table_kitchen_sink.operation'),
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
    protected svc: InvoiceService
  ) {
    super(logger, fb, svc, {
      keyword: '',
      time: [null],
      beginTime: [null],
      endTime: [null],
    });
  }

  ngOnInit() {
    this.getPage();
  }

  onClick() {}

  onSearch() {
    this.getPage();
  }

  edit(data: any) {
    this.logger.debug('edit...');
  }

  top(data: any) {}

  delete(data: any) {}
}