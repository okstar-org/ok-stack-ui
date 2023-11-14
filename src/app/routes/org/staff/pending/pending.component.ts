import { Component, Injectable, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
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
  ) {}

  ngOnInit() {
    this.userDataSource = new UserDataSource();
    this.pendingService.page().subscribe(r => {
      this.userDataSource.setData(r);
    });
  }

  doAdd() {
    this.dialog.open(DialogAddComponent);
  }

  doJoin(id: number) {
    console.log('doJoin', id);
    //TODO(nzb) 传递ID
    this.dialog.open(JoinDialogComponent);
  }
}
