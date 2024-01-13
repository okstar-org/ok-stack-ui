import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, merge, Observable } from 'rxjs';

import { Staff } from '../staff.api';
import { LeftService } from './left.service';
import { JoinDialogComponent } from '../dialog-join/join-dialog.component';
import { Router } from '@angular/router';

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
    private dialog: MatDialog,
    private leftService: LeftService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userDataSource = new UserDataSource();
    this.leftService.page({}).subscribe(r => {
      this.userDataSource.setData(r.list);
    });
  }

  doJoin(id: number) {
    console.log('doJoin', id);
    this.dialog
      .open(JoinDialogComponent, {
        width: '800px',
        data: { id },
      })
      .afterClosed()
      .subscribe(r => {
        this.router.navigateByUrl('/org/staff/employed');
      });
  }
}
