import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MtxGridColumn } from '@ng-matero/extensions';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { OkPaginatorComponent } from '@shared/components/ok/ok-paginator.component';
import { ID } from '@shared/api/ok';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent extends OkPaginatorComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('bpm.task.id'),
      field: 'id',
      sortable: true,
    },
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
      header: this.translate.stream('bpm.task.activationTime'),
      field: 'activationTime',
      sortable: true,
    },
    {
      header: this.translate.stream('bpm.task.expirationTime'),
      field: 'expirationTime',
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
          icon: 'add_to_queue',
          text: this.translate.stream('bpm.task.claim'),
          tooltip: this.translate.stream('bpm.task.claim'),
          iif: row => row.status === 'Ready',
          click: (row: ID) => this.doClaim(row),
        },
        {
          color: 'primary',
          icon: 'remove_from_queue',
          text: this.translate.stream('bpm.task.release'),
          tooltip: this.translate.stream('bpm.task.release'),
          iif: row => row.status === 'Reserved',
          click: (row: ID) => this.doRelease(row),
        },
        {
          color: 'primary',
          icon: 'play_arrow',
          text: this.translate.stream('common.start'),
          tooltip: this.translate.stream('common.start'),
          iif: row => row.status === 'Reserved',
          click: row => this.doStart(row),
        },
        {
          color: 'primary',
          icon: 'play_circle_outline',
          text: this.translate.stream('common.resume'),
          tooltip: this.translate.stream('common.resume'),
          iif: row => row.status === 'Suspended',
          click: row => this.doResume(row),
        },
        {
          color: 'primary',
          icon: 'stop',
          text: this.translate.stream('common.stop'),
          tooltip: this.translate.stream('common.stop'),
          iif: row => row.status === 'InProgress',
          click: row => this.doStop(row),
        },
        {
          color: 'primary',
          icon: 'pause_circle_outline',
          text: this.translate.stream('bpm.task.suspend'),
          tooltip: this.translate.stream('bpm.task.suspend'),
          iif: row => row.status === 'Ready'||row.status === 'Reserved'||row.status === 'InProgress',
          click: row => this.doSuspend(row),
        },
        {
          color: 'primary',
          icon: 'check_circle_outline',
          text: this.translate.stream('common.complete'),
          tooltip: this.translate.stream('common.complete'),
          iif: row => row.status === 'InProgress',
          click: row => this.doComplete(row),
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

  doResume(row: ID){
    this.logger.info('doResume', row);
    this.svc.doResume(row).subscribe(r => {
      console.log('doResume=>', r);
      this.getPage();
    });
  }

  doStop(row: ID){
    this.logger.info('doStop', row);
    this.svc.doStop(row).subscribe(r => {
      console.log('doStop=>', r);
      this.getPage();
    });
  }

  doStart(row: ID){
    this.logger.info('doStart', row);
    this.svc.doStart(row).subscribe(r => {
      console.log('doStart=>', r);
      this.getPage();
    });
  }

  doClaim(row: ID) {
    this.logger.info('doClaim', row);
    this.svc.doClaim(row).subscribe(r => {
      console.log('doClaim=>', r);
      this.getPage();
    });
  }

  doRelease(row: ID){
    this.logger.info('doRelease', row);
    this.svc.doRelease(row).subscribe(r => {
      console.log('doRelease=>', r);
      this.getPage();
    });
  }

  doSuspend(row: ID){
    this.logger.info('doSuspend', row);
    this.svc.doSuspend(row).subscribe(r => {
      console.log('doSuspend=>', r);
      this.getPage();
    });
  }

  doComplete(row: ID){
    this.logger.info('doComplete', row);
    this.svc.doComplete(row, {}).subscribe(r => {
      console.log('doComplete=>', r);
      this.getPage();
    });
  }
}
