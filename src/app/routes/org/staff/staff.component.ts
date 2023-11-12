import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { StaffService } from './staff.service';
import { DeptService } from '../dept/dept.service';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { User } from './staff.api';
import { Org } from '../org.api';
import { OrgService } from '../org.service';

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

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable()
export class DynamicDatabase {
  constructor(
    private deptService: DeptService,
    private staffService: StaffService,
    private orgService: OrgService
  ) {}

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
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
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

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [DynamicDatabase],
})
export class StaffComponent implements OnInit {
  displayedColumns = ['no', 'name', 'recruit', 'assignFor', 'createAt', 'updateAt'];

  dataSource: any;

  userDataSource!: UserDataSource;

  org!: Org;

  constructor(
    protected logger: NGXLogger,
    private database: DynamicDatabase,
    private svc: StaffService,
    private orgService: OrgService,
    private deptService: DeptService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.database.initialData().subscribe(r => {
      this.dataSource.data = r;
    });

    this.orgService.getCurrentOrg().subscribe(r => {
      this.org = r;
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  ngOnInit() {
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

  onAdd() {}

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
