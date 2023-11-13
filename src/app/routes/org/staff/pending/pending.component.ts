import { Component, Injectable, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, merge, Observable } from 'rxjs';

import { Staff, User } from '../staff.api';

import { PendingService } from './pending.service';
import { DynamicDataSource } from '../../org.component';

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
  displayedColumns = ['no', 'name', 'gender', 'birthday', 'phone', 'descr', 'createAt'];

  dataSource: any;

  userDataSource!: UserDataSource;

  constructor(private pendingService: PendingService) {}

  ngOnInit() {
    this.userDataSource = new UserDataSource();
    this.pendingService.page().subscribe(r => {
      this.userDataSource.setData(r);
    });
  }

  doAdd() {}
}
