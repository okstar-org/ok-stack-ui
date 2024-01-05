import { Component, Injectable, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, timer as Timer } from 'rxjs';
import { Staff } from '../staff.api';
import { PendingService } from './pending.service';
import { MatDialog } from '@angular/material/dialog';
import { JoinDialogComponent } from '../dialog-join/join-dialog.component';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
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
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  displayedColumns = ['no', 'name', 'gender', 'phone', 'email', 'descr', 'createAt', 'operation'];

  dataSource: any;

  userDataSource!: UserDataSource;

  constructor(
    public dialog: MatDialog,
    private router: Router,
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
        console.log('edit=>', r);
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
        this.router.navigateByUrl('/org/staff/employed');
      });
  }
}
