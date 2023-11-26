import { TranslateService } from '@ngx-translate/core';
import { OkPaginatorComponent } from '@shared/components/ok/ok-paginator.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { NGXLogger } from 'ngx-logger';

import { RoomService } from './room.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [RoomService],
})
export class RoomComponent extends OkPaginatorComponent implements OnInit {
  group = new FormGroup({});
  backParams: any = {};

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
      header: this.translate.stream('chat.room.roomName'),
      field: 'roomName',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.room.naturalName'),
      field: 'naturalName',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.room.subject'),
      field: 'subject',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.room.description'),
      field: 'description',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.room.owners'),
      field: 'owners',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.room.members'),
      field: 'members',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.room.maxUsers'),
      field: 'maxUsers',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.room.publicRoom'),
      field: 'publicRoom',
      sortable: true,
    },
    // {
    //   header: '操作',
    //   field: 'operation',
    //   minWidth: 180,
    //   width: '200px',
    //   pinned: 'right',
    //   type: 'button',
    // buttons: [
    //   {
    //     type: 'icon',
    //     icon: 'chat',
    //     text: '跟进',
    //     tooltip: '跟进',
    //   },
    //   {
    //     color: 'primary',
    //     icon: 'edit',
    //     text: this.translate.stream('table_kitchen_sink.edit'),
    //     tooltip: this.translate.stream('table_kitchen_sink.edit'),

    //     click: record => this.edit(record),
    //   },
    //   {
    //     color: 'warn',
    //     icon: 'delete',
    //     text: this.translate.stream('table_kitchen_sink.delete'),
    //     tooltip: this.translate.stream('table_kitchen_sink.delete'),
    //     pop: {
    //       title: this.translate.stream('table_kitchen_sink.confirm_delete'),
    //       closeText: this.translate.stream('table_kitchen_sink.close'),
    //       okText: this.translate.stream('table_kitchen_sink.ok'),
    //     },

    //   },
    //   {
    //     color: 'accent',
    //     icon: 'arrow_upward',
    //     text: '置顶',
    //     tooltip: '置顶',

    //   },
    // ],
    // },
  ];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: RoomService
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
  getBackParams(param: any) {
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
