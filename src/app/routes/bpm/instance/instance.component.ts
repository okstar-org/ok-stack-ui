import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { OkPaginatorComponent } from '@shared/components/ok/ok-paginator.component';
import { NGXLogger } from 'ngx-logger';
import { InstanceService } from './instance.service';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.scss'],
})
export class InstanceComponent extends OkPaginatorComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('bpm.instance.id'),
      field: 'id',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.instance.processName'),
      field: 'processName',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.instance.processId'),
      field: 'processId',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.instance.processVersion'),
      field: 'processVersion',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.instance.containerId'),
      field: 'containerId',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.instance.date'),
      field: 'date',
      sortable: true,
      // type: 'date',
    },

    {
      header: this.translate.stream('bpm.instance.slaDueDate'),
      field: 'slaDueDate',
      sortable: true,
      // type: 'date',
    },
    {
      header: this.translate.stream('bpm.instance.processInstanceDescription'),
      field: 'processInstanceDescription',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.instance.state'),
      field: 'state',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.instance.initiator'),
      field: 'initiator',
      sortable: true,
    },
    {
      header: this.translate.stream('common.operation'),
      field: 'operation',
      minWidth: 180,
      width: '200px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'primary',
          icon: 'play_arrow',
          text: this.translate.stream('common.resume'),
          tooltip: this.translate.stream('common.resume'),
          iif: row => row.status === 'Suspended',
          // click: row => this.doResume(row),
        },
        {
          color: 'primary',
          icon: 'check',
          text: this.translate.stream('bpm.instance.claim'),
          tooltip: this.translate.stream('bpm.instance.claim'),
          iif: row => row.status === 'Ready',
          // click: row => this.doClaim(row),
        },
        {
          color: 'primary',
          icon: 'close',
          text: this.translate.stream('bpm.instance.release'),
          tooltip: this.translate.stream('bpm.instance.release'),
          iif: row => row.status === 'InProgress',
          // click: row => this.doResume(row),
        },
      ],
    },
  ];

  searchControls: any[] = [
    {
      name: 'keyword',
      type: 'input',
      label: '关键词',
    },
    {
      name: 'status',
      type: 'checkbox',
      label: '实例状态',
      checkbox: [
        { name: 'Created', text: '创建的' },
        // { name: 'Ready', text: '准备的' },
        // { name: 'Resorved', text: '保留的' },
        // { name: 'Suspended', text: '暂停的' },
        // { name: 'InProgress', text: '进行中' },
        // { name: 'Completed', text: '完成的' },
        // { name: 'Exited', text: '退出的' },
        // { name: 'Error', text: '错误的' },
      ],
    },
  ];
  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: InstanceService
  ) {
    super(fb, cdr, logger, svc, {
      keyword: '',
      status: [],
    });
  }

  ngOnInit() {
    this.getPage();
  }
}
