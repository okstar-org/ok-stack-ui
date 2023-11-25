import { Component, Inject, OnInit } from '@angular/core';
import { JoinDialogService } from './join-dialog.service';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { Dept } from '../../dept/dept.api';
import { PendingService } from '../pending/pending.service';
import { OrgStaffJoinReq } from '../staff.api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';

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
  // displayedColumns = ['check', 'no', 'name', 'descr', 'createAt'];
  // deptDs!: DeptDataSource;

  list: any[] = [];
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('org.staff.dept.no'),
      field: 'no',
    },
    {
      header: this.translate.stream('org.staff.dept.name'),
      field: 'name',
    },
    {
      header: this.translate.stream('org.staff.dept.descr'),
      field: 'descr',
    },
    {
      header: this.translate.stream('org.staff.dept.createAt'),
      field: 'createAt',
    },
  ];
  selectedRows: any[] = [];

  constructor(
    private joinDialogService: JoinDialogService,
    private pendingSrv: PendingService,
    private translate: TranslateService,
    private dialogRef: MatDialogRef<JoinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // this.deptDs = new DeptDataSource();
  }

  ngOnInit(): void {
    this.joinDialogService.listDept().subscribe(list => {
      this.list = list;
    });
  }

  doSubmit() {
    const ids = this.selectedRows.map(r => r.id);
    const req: OrgStaffJoinReq = { staffId: 0, postIds: ids };
    this.pendingSrv.join(req);
    console.log(req);
  }
}
