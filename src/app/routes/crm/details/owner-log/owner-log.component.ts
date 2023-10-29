import { OwnerLogService } from './owner-log.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-owner-log',
  templateUrl: './owner-log.component.html',
  styleUrls: ['./owner-log.component.scss'],
})
export class OwnerLogComponent extends OkDetailComponent implements OnInit {
  searchControls: any[] = [
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
      header: this.translate.stream('crm.owner-log.time'),
      field: 'time',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.owner-log.userName'),
      field: 'userName',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.owner-log.type'),
      field: 'type',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.owner-log.id'),
      field: 'id',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.owner-log.beforeData'),
      field: 'beforeData',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.owner-log.afterData'),
      field: 'afterData',
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
          pop: {
            title: this.translate.stream('table_kitchen_sink.confirm_delete'),
            closeText: this.translate.stream('table_kitchen_sink.close'),
            okText: this.translate.stream('table_kitchen_sink.ok'),
          },
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
    protected svc: OwnerLogService
  ) {
    super(logger, fb, svc, {
      keyword: '',
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
