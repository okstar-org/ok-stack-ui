import { RoleService } from './role.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent {
  fmt = 'yy-MM-dd HH:mm:ss';
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('common.name'),
      field: 'name',
    },
    {
      header: this.translate.stream('common.description'),
      field: 'description',
    },

    {
      header: '',
      field: 'operation',
      width: '60px',
      type: 'button',
      show: false,
      pinned: 'right',

      // buttons: [
      //   {
      //     type: 'icon',
      //     icon: 'edit',
      //     text: this.translate.instant('common.edit'),
      //     tooltip: this.translate.instant('common.edit'),
      //     click: row => {},
      //   },
      // ],
    },
  ];
  list: any[] = [];
  total = 0;
  isLoading = false;
  query = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor(
    private translate: TranslateService,
    public dialog: MatDialog,
    private srv: RoleService
  ) {
    this.load();
  }

  getNextPage(e: PageEvent) {
    this.query.pageIndex = e.pageIndex;
    this.query.pageSize = e.pageSize;
    this.load();
  }

  load() {
    this.isLoading = true;
    this.srv.list(this.query).subscribe(res => {
      this.list = res;
      this.isLoading = false;
    });
  }
}
