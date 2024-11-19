import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { ResourceService } from './resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent {
  fmt = 'yy-MM-dd HH:mm:ss';
  columns: MtxGridColumn[] = [
    // {
    //   header: this.translate.stream('common.id'),
    //   field: 'id',
    //   width: '120px',
    // },
    {
      header: this.translate.stream('common.name'),
      field: 'name',
    },
    {
      header: this.translate.stream('common.displayName'),
      field: 'displayName',
    },
    {
      header: this.translate.stream('URN'),
      field: 'type',
    },

    {
      header: this.translate.stream('common.uris'),
      field: 'uris',
    },
    {
      header: this.translate.stream('Icon URI'),
      field: 'iconUri',
    },
    {
      header: this.translate.stream('common.scopes'),
      field: 'scopes',
      width: '210px',
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
    private srv: ResourceService
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
