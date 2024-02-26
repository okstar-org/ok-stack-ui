import { Component, Injectable, OnInit } from '@angular/core';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { Org } from '../../org.api';
import { StaffService } from '../staff.service';
import { DeptService } from '../../dept/dept.service';

import { Staff } from '../staff.api';
import { EmployedService } from './employed.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JoinDialogComponent } from '../dialog-join/join-dialog.component';
import { DynamicFlatNode } from '../../dept/dept.api';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { DatePipe } from '@angular/common';

@Injectable()
export class DynamicDatabase {
  constructor(private deptService: DeptService) {}

  /** Initial data from database */
  initialData(): Observable<DynamicFlatNode[]> {
    return this.getChildren();
  }

  children(node: number): Observable<DynamicFlatNode[]> {
    return this.deptService.children(node).pipe(
      map(depts => {
        return depts.map(
          dept => new DynamicFlatNode(dept.id, dept, dept.level, dept.sourceList, true)
        );
      })
    );
  }

  getChildren(): Observable<DynamicFlatNode[]> {
    return this.deptService.getChildren().pipe(
      map(depts => {
        return depts.map(
          dept => new DynamicFlatNode(dept.id, dept, dept.level, dept.sourceList, true)
        );
      })
    );
  }
}

@Injectable()
export class DynamicDataSource {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
    private database: DynamicDatabase
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    // tslint:disable-next-line: deprecation
    this.treeControl.expansionModel.changed.subscribe(change => {
      if (change.added || change.removed) {
        this.handleTreeControl(change);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const index = this.data.indexOf(node);
    if (expand) {
      node.isLoading = true;
      this.database.children(node.id).subscribe(r => {
        node.isLoading = false;

        if (!r || r.length <= 0) {
          return;
        }

        this.data.splice(index + 1, 0, ...r);

        // notify the change
        this.dataChange.next(this.data);
      });
    } else {
      this.clearChildren(node);
    }
  }

  clearChildren(node: DynamicFlatNode) {
    const index = this.data.indexOf(node);
    let count = 0;
    for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) {
      //
    }
    this.data.splice(index + 1, count);
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-employed',
  templateUrl: './employed.component.html',
  styleUrls: ['./employed.component.scss'],
  providers: [DynamicDatabase, DatePipe],
})
export class EmployedComponent implements OnInit {
  list: any[] = [];
  total = 0;
  isLoading = false;
  query = {
    pageIndex: 0,
    pageSize: 50,
    deptId: 0,
  };

  fmt = 'yy-MM-dd HH:mm:ss';
  columns: MtxGridColumn[] = [
    { header: this.translate.stream('common.no'), field: 'fragment.no', maxWidth: 60 },
    { header: this.translate.stream('common.name'), field: 'fragment.name', minWidth: 200 },
    {
      header: this.translate.stream('common.gender'),
      field: 'fragment.gender',
      maxWidth: 60,
      formatter: row => {
        return this.translate.instant('common.' + row.fragment.gender);
      },
    },

    { header: this.translate.stream('common.email'), field: 'fragment.email' },
    { header: this.translate.stream('common.phone'), field: 'fragment.phone' },
    {
      header: this.translate.stream('common.birthday'),
      field: 'fragment.birthday',
      maxWidth: 60,
      formatter: row => {
        return this.datePipe.transform(row.fragment.birthday, this.fmt);
      },
    },
    {
      header: this.translate.stream('org.staff.employed.joinedDate'),
      field: 'joinedDate',
      maxWidth: 60,
      formatter: row => {
        return this.datePipe.transform(row.joinedDate, this.fmt);
      },
    },
    {
      header: this.translate.stream('org.staff.employed.postNames'),
      field: 'postNames',
      minWidth: 600,
    },
    {
      header: this.translate.stream('common.operation'),
      field: 'operation',
      width: '60px',
      type: 'button',
      pinned: 'right',
      buttons: [
        {
          type: 'icon',
          icon: 'assignment_late',
          tooltip: this.translate.instant('org.staff.employed.leave'),
          click: row => {
            this.doLeave(row);
          },
        },
      ],
    },
  ];

  dataSource: any;

  org!: Org;
  treeControl: FlatTreeControl<DynamicFlatNode>;

  selectedNode!: DynamicFlatNode;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  constructor(
    private datePipe: DatePipe,
    private translate: TranslateService,
    private mtxDialog: MtxDialog,
    private database: DynamicDatabase,
    private deptService: DeptService,
    private logger: NGXLogger,
    private svc: StaffService,
    private employedService: EmployedService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
  }
  ngOnInit(): void {
    this.deptService.getCurrentOrg().subscribe(r => {
      this.org = r;
    });

    this.loadData();
  }

  loadData() {
    this.database.initialData().subscribe(r => {
      this.dataSource.data = r;
    });
  }
  getNextPage(e: PageEvent) {
    this.query.pageIndex = e.pageIndex;
    this.query.pageSize = e.pageSize;
    this.getList();
  }
  getList() {
    this.isLoading = true;
    this.employedService.page(this.query).subscribe(res => {
      this.list = res.list;
      this.total = res.totalCount;
      this.isLoading = false;
    });
  }
  onClickDept(node: DynamicFlatNode) {
    this.selectedNode = node;
    this.query.deptId = node.id;
    this.getList();
  }

  onAdd() {
    console.log('onAdd...');
  }

  doLeave(staff: Staff) {
    this.mtxDialog.confirm(
      this.translate.stream('org.staff.employed.leave_dialog_msg'),
      staff.fragment.name,
      () => {
        this.employedService.leavel(staff.id).subscribe(r => {
          this.router.navigateByUrl('/org/staff/left');
        });
      }
    );
  }

  doReassignment(staff: Staff) {
    //调岗
    console.log('doReassignment', staff.id);
    this.dialog
      .open(JoinDialogComponent, {
        width: '800px',
        data: { id: staff.id, postIds: staff.postIds, assignment: true },
      })
      .afterClosed()
      .subscribe(r => {
        this.loadData();
      });
  }

  onSync() {
    this.logger.info('sync');
    this.svc.sync().subscribe(r => {
      this.logger.info('sync=>', r);
      this.database.initialData().subscribe(r2 => {
        this.dataSource.data = r2;
      });
    });
  }
}
