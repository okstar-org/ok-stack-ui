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
import { OrgService } from '../../org.service';
import { Staff, User } from '../staff.api';
import { EmployedService } from './employed.service';

export class DynamicFlatNode {
  constructor(
    public id: number,
    public item: string,
    public level: number,
    public resourceList: string[],
    public expandable = false,
    public isLoading = false
  ) {}
}

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
          dept => new DynamicFlatNode(dept.id, dept.name, dept.level, dept.sourceList, true)
        );
      })
    );
  }

  getChildren(): Observable<DynamicFlatNode[]> {
    return this.deptService.getChildren().pipe(
      map(depts => {
        return depts.map(
          dept => new DynamicFlatNode(dept.id, dept.name, dept.level, dept.sourceList, true)
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
    console.log('toggleNode', node, index, expand);

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
      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {
        //
      }
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
    }
  }
}

export class UserDataSource extends DataSource<User> {
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor() {
    super();
  }

  connect(): Observable<User[]> {
    return this.dataChange;
  }

  disconnect() {}

  setData(list: User[]) {
    this.dataChange.next(list);
  }
}

@Component({
  selector: 'app-employed',
  templateUrl: './employed.component.html',
  styleUrls: ['./employed.component.scss'],
  providers: [DynamicDatabase],
})
export class EmployedComponent implements OnInit {
  displayedColumns = [
    'no',
    'name',
    'gender',
    'birthday',
    'phone',
    'descr',
    'joinedDate',
    'operation',
  ];

  dataSource: any;

  userDataSource!: UserDataSource;

  org!: Org;

  treeControl: FlatTreeControl<DynamicFlatNode>;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  constructor(
    private translate: TranslateService,
    private mtxDialog: MtxDialog,
    private database: DynamicDatabase,
    private orgService: OrgService,
    private logger: NGXLogger,
    private svc: StaffService,
    private employedService: EmployedService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
  }
  ngOnInit(): void {
    this.orgService.getCurrentOrg().subscribe(r => {
      this.org = r;
    });

    this.database.initialData().subscribe(r => {
      this.dataSource.data = r;
    });

    this.userDataSource = new UserDataSource();
  }

  onClickDept(node: DynamicFlatNode) {
    this.svc.findUserByDept(node.id).subscribe(r => {
      this.userDataSource.setData(r);
    });
  }

  onAdd() {
    console.log('onAdd...');
  }

  doLeave(staff: Staff) {
    console.log('doLeave', staff);
    this.mtxDialog.confirm(
      this.translate.stream('org.staff.employed.leave_dialog_msg'),
      staff.name,
      () => {
        this.employedService.leavel(staff.id).subscribe(r => {
          console.log('=>', r);
        });
      }
    );
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

  onSyncUser() {
    this.logger.info('syncUser');
    this.svc.syncUser().subscribe(r => {
      this.logger.info('syncUser=>', r);
      // this.database.initialData().subscribe(r2 => {
      //   this.userDataSource.setData(r2);
      // });
    });
  }
}
