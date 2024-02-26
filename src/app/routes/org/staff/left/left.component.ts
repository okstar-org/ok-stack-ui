import { OrgStaffJoinReq } from './../staff.api';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, merge, Observable } from 'rxjs';

import { Staff } from '../staff.api';
import { LeftService } from './left.service';
import { JoinDialogComponent } from '../dialog-join/join-dialog.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss'],
})
export class LeftComponent implements OnInit {
  displayedColumns = ['no', 'name', 'gender', 'phone', 'descr', 'leftDate', 'operation'];

  fmt = 'yy-MM-dd HH:mm:ss';
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('common.no'),
      field: 'fragment.no',
      width: '120px',
    },
    {
      header: this.translate.stream('common.name'),
      field: 'fragment.name',
      width: '120px',
    },
    {
      header: this.translate.stream('common.gender'),
      field: 'fragment.gender',
      width: '120px',
    },
    {
      header: this.translate.stream('common.phone'),
      field: 'fragment.phone',
      width: '120px',
    },
    {
      header: this.translate.stream('common.email'),
      field: 'fragment.email',
      width: '300px',
    },
    {
      header: this.translate.stream('common.descr'),
      field: 'fragment.descr',
    },
    {
      header: this.translate.stream('common.createAt'),
      field: 'createAt',
      width: '210px',
    },
    {
      header: '',
      field: 'operation',
      width: '60px',
      type: 'button',
      show: false,
      pinned: 'right',

      buttons: [
        {
          text: this.translate.stream('org.staff.left.join'),
          click: row => {
            console.log(row);
            this.doJoin(row.id);
          },
        },
      ],
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
    private dialog: MatDialog,
    private svc: LeftService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  getNextPage(e: PageEvent) {
    this.query.pageIndex = e.pageIndex;
    this.query.pageSize = e.pageSize;
    this.load();
  }

  load() {
    this.isLoading = true;
    this.svc.page(this.query).subscribe(res => {
      this.list = res.list;
      this.total = res.totalCount;
      this.isLoading = false;
    });
  }

  doJoin(id: number) {
    if (!id) return;

    this.dialog
      .open(JoinDialogComponent, {
        width: '800px',
        data: { id },
      })
      .afterClosed()
      .subscribe(r => {
        if (r) this.router.navigateByUrl('/org/staff/employed');
      });
  }
}
