import { AttachService } from './attach.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.scss'],
})
export class AttachComponent extends OkDetailComponent implements OnInit {
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
      header: this.translate.stream('crm.attach.name'),
      field: 'name',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.attach.type'),
      field: 'type',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.attach.length'),
      field: 'length',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.attach.time'),
      field: 'time',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.attach.creator'),
      field: 'creator',
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
    protected svc: AttachService
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
