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
          type: 'icon',
          icon: 'assignment_ind',
          text: this.translate.instant('org.staff.pending.join'),
          tooltip: this.translate.instant('org.staff.pending.join'),
          click: row => {
            this.doJoin(row);
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

  doAdd() {
    this.dialog
      .open(DialogAddComponent)
      .afterClosed()
      .subscribe(r => {
        this.load();
      });
  }

  onEdit(staff: Staff) {
    this.dialog
      .open(DialogAddComponent, {
        data: Object.assign(staff.fragment, { id: staff.id }),
      })
      .afterClosed()
      .subscribe(r => {
        this.load();
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
