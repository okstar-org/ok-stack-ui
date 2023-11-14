import { Component, OnInit } from '@angular/core';
import { JoinDialogService } from './join-dialog.service';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { Dept } from '../../dept/dept.api';
import { PendingService } from '../pending/pending.service';
import { OrgStaffJoinReq } from '../staff.api';

export class DeptDataSource extends DataSource<Dept> {
  dataChange: BehaviorSubject<Dept[]> = new BehaviorSubject<Dept[]>([]);

  constructor() {
    super();
  }

  connect(): Observable<Dept[]> {
    return this.dataChange;
  }

  disconnect() {}

  setData(list: Dept[]) {
    this.dataChange.next(list);
  }
}

@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.scss'],
})
export class JoinDialogComponent implements OnInit {
  displayedColumns = ['check', 'no', 'name', 'descr', 'createAt'];
  deptDs!: DeptDataSource;
  constructor(
    private joinDialogService: JoinDialogService,
    private pendingSrv: PendingService
  ) {
    this.deptDs = new DeptDataSource();
  }

  ngOnInit(): void {
    this.joinDialogService.listDept().subscribe(r => {
      this.deptDs.setData(r);
    });
  }

  doSubmit() {
    //TODO(nzb) 设置 OrgStaffJoinReq
    const req: OrgStaffJoinReq = { staffId: 0, postIds: [] };
    this.pendingSrv.join(req);
  }
}
