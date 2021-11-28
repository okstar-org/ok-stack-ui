import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MtxGridColumn } from '@ng-matero/extensions';
import { TranslateService } from '@ngx-translate/core';
import { OkPaginatorComponent } from '@shared/components/ok/ok-paginator.component';
import { NGXLogger } from 'ngx-logger';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent extends OkPaginatorComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('bpm.task.name'),
      field: 'name',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.task.containerId'),
      field: 'containerId',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.task.processId'),
      field: 'processId',
      sortable: true,
    },

    {
      header: this.translate.stream('bpm.task.createdAt'),
      field: 'createdOn',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.task.status'),
      field: 'status',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.task.actualOwner'),
      field: 'actualOwner',
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
          click: row => this.doResume(row),
        },
        {
          color: 'primary',
          icon: 'check',
          text: this.translate.stream('bpm.task.claim'),
          tooltip: this.translate.stream('bpm.task.claim'),
          iif: row => row.status === 'Ready',
          click: row => this.doClaim(row),
        },
        {
          color: 'primary',
          icon: 'close',
          text: this.translate.stream('bpm.task.release'),
          tooltip: this.translate.stream('bpm.task.release'),
          iif: row => row.status === 'InProgress',
          click: row => this.doResume(row),
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
      name: 'status',
      type: 'checkbox',
      label: '任务状态',
      checkbox: [
        { name: 'Created', text: '创建的' },
        { name: 'Ready', text: '准备的' },
        { name: 'Resorved', text: '保留的' },
        { name: 'Suspended', text: '暂停的' },
        { name: 'InProgress', text: '进行中' },
        { name: 'Completed', text: '完成的' },
        { name: 'Exited', text: '退出的' },
        { name: 'Error', text: '错误的' },
      ],
    },
  ];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: TaskService
  ) {
    super(fb, cdr, logger, svc, {
      keyword: '',
      status: [],
    });
  }

  ngOnInit() {
    this.getPage();
  }

  doResume(row: any) {
    this.logger.info('doResume', row);
  }

  doClaim(row: any) {
    this.logger.info('doClaim', row);
  }
}
