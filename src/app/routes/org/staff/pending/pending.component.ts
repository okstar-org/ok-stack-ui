import { Component, OnInit } from '@angular/core';
import { Staff } from '../staff.api';
import { PendingService } from './pending.service';
import { MatDialog } from '@angular/material/dialog';
import { JoinDialogComponent } from '../dialog-join/join-dialog.component';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  fmt = 'yy-MM-dd HH:mm:ss';
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('common.no'),
      field: 'no',
      width: '60px',
    },
    {
      header: this.translate.stream('common.name'),
      field: 'fragment.firstName',
      width: '120px',
      formatter: row => {
        return this.getName(row);
      },
    },
    {
      header: this.translate.stream('common.gender'),
      field: 'fragment.gender',
      width: '120px',
      formatter: row => {
        return this.translate.instant('common.' + row.fragment.gender);
      },
    },
    {
      header: this.translate.stream('common.email'),
      field: 'fragment.email',
      width: '160px',
    },
    {
      header: this.translate.stream('common.phone'),
      field: 'fragment.phone',
      width: '120px',
    },
    {
      header: this.translate.stream('common.city'),
      field: 'fragment.city',
      width: '120px',
      formatter: row => {
        return row.fragment.city;
      },
    },
    {
      header: this.translate.stream('common.createAt'),
      field: 'createAt',
      width: '210px',
    },
    {
      header: '',
      field: 'operation',
      type: 'button',
      show: true,
      pinned: 'right',
      width: '140px',
      buttons: [
        {
          type: 'icon',
          icon: 'assignment_ind',
          tooltip: this.translate.instant('org.staff.pending.join'),
          click: row => {
            this.doJoin(row);
          },
        },
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.instant('common.edit'),
          click: row => {
            this.doEdit(row);
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
    public dialog: MatDialog,
    private router: Router,
    private svc: PendingService
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

  getName(row: Staff) {
    if (row.fragment.firstName && row.fragment.lastName) {
      return row.fragment.firstName + row.fragment.lastName;
    }
    if (row.fragment.firstName) {
      return row.fragment.firstName;
    }
    return row.fragment.lastName;
  }

  doAdd() {
    this.dialog
      .open(DialogAddComponent)
      .afterClosed()
      .subscribe(r => {
        this.load();
      });
  }

  doEdit(staff: Staff) {
    this.dialog
      .open(DialogEditComponent, { data: staff.fragment })
      .afterClosed()
      .subscribe(r => {
        console.log('=>', r);
        if (r) this.load();
      });
  }

  doJoin(staff: Staff) {
    this.dialog
      .open(JoinDialogComponent, {
        width: '800px',
        data: { id: staff.id },
      })
      .afterClosed()
      .subscribe(r => {
        if (r) {
          this.router.navigateByUrl('/org/staff/employed');
        }
      });
  }
}
