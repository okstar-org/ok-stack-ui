import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { DeptService } from './dept.service';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { User } from './dept.api';

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
  constructor(private deptService: DeptService) {}

  dataMap = new Map<string, string[]>([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']],
  ]);

  /** Initial data from database */
  initialData(): Observable<DynamicFlatNode[]> {
    return this.deptService.children(0).pipe(
      map(r => {
        return r.data.map(
          dept => new DynamicFlatNode(dept.id, dept.name, dept.level, dept.sourceList, true)
        );
      })
    );
  }

  getChildren(node: number): Observable<DynamicFlatNode[]> {
    return this.deptService.children(node).pipe(
      map(r => {
        return r.data.map(
          dept => new DynamicFlatNode(dept.id, dept.name, dept.level, dept.sourceList, true)
        );
      })
    );
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
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
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
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
      this.database.getChildren(node.id).subscribe(r => {
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
      ) {}
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
    }
  }
}

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss'],
  providers: [DynamicDatabase],
})
export class DeptComponent implements OnInit {
  displayedColumns = ['avatar', 'no', 'name', 'gender', 'mobile', 'active', 'sourceObjectList'];

  dataSource: DynamicDataSource;

  userDataSource: UserDataSource;

  constructor(
    protected logger: NGXLogger,
    private database: DynamicDatabase,
    private svc: DeptService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.database.initialData().subscribe(r => {
      this.dataSource.data = r;
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSourcea: DynamicDataSource | any;

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
    this.logger.info('click', node);
    this.svc.findByDept(node.id).subscribe(r => {
      this.logger.info('r', r);
      this.userDataSource.setData(r.data);
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
