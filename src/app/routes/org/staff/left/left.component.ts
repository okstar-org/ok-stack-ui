import { Component, Injectable, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, merge, Observable } from 'rxjs';

import { Staff, User } from '../staff.api';

import { DynamicDataSource } from '../../org.component';
import { LeftService } from './left.service';
import { MatDialog } from '@angular/material/dialog';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';

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
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss'],
})
export class LeftComponent implements OnInit {
  displayedColumns = ['no', 'name', 'gender', 'phone', 'descr', 'leftDate', 'operation'];

  dataSource: any;

  userDataSource!: UserDataSource;

  constructor(
    public dialog: MatDialog,
    private leftService: LeftService
  ) {}

  ngOnInit() {
    this.userDataSource = new UserDataSource();
    this.leftService.page().subscribe(r => {
      this.userDataSource.setData(r);
    });
  }

  doJoin(id: number) {
    console.log('doJoin', id);
    //TODO(nzb) 传递ID
    this.dialog.open(JoinDialogComponent);
  }
}
