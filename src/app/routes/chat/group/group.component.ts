import { TranslateService } from '@ngx-translate/core';
import { OkPaginatorComponent } from '@shared/components/ok/ok-paginator.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { NGXLogger } from 'ngx-logger';

import { GroupService } from './group.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ChatGroup } from './group.api';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  providers: [GroupService],
})
export class GroupComponent extends OkPaginatorComponent implements OnInit {
  group = new FormGroup({});
  backParams: any = {};

  total = 0;

  rowSelectable = true;
  columnHideable = true;
  columnMovable = true;
  multiSelectable = true;
  showToolbar = true;

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('chat.group.name'),
      field: 'name',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.group.description'),
      field: 'description',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.group.members'),
      field: 'members',
      sortable: true,
    },
  ];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: GroupService
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
