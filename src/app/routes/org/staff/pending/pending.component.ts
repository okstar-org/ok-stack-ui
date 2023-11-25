import { Component, Injectable, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, timer as Timer } from 'rxjs';
import { Staff } from '../staff.api';
import { PendingService } from './pending.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { JoinDialogComponent } from '../dialog-join/join-dialog.component';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

export class UserDataSource extends DataSource<Staff> {
  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);

  constructor() {
    super();
  }

  connect(): Observable<Staff[]> {
    return this.dataChange;
  }

  disconnect() {}

  setData(list: Staff[]) {
    this.dataChange.next(list);
  }
}

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  displayedColumns = ['no', 'name', 'gender', 'phone', 'descr', 'createAt', 'operation'];

  dataSource: any;

  userDataSource!: UserDataSource;

  constructor(
    public dialog: MatDialog,
    private pendingService: PendingService
  ) {
    this.userDataSource = new UserDataSource();
  }

  ngOnInit() {
    this.load();
  }
  load() {
    this.pendingService.page().subscribe(r => {
      this.userDataSource.setData(r);
    });
  }
  doAdd() {
    const ref = this.dialog.open(DialogAddComponent);
    // 在这里编写要延迟执行的代码
    ref.afterClosed().subscribe(r => {
      Timer(1000).subscribe(() => {
        console.log('close=>', r);
        if (r) {
          this.load();
        }
      });
    });
  }

  onEdit(id: number) {}

  doJoin(id: number) {
    console.log('doJoin', id);
    this.dialog.open(JoinDialogComponent, {
      width: '800px',
      data: { id },
    });
  }
}
function timer(arg0: number) {
  throw new Error('Function not implemented.');
}
