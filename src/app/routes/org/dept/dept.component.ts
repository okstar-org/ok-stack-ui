import { DeptService } from './dept.service';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { DynamicFlatNode, OrgDept, OrgPost } from './dept.api';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from './add-post/add-post.component';
import { AddDeptComponent } from './add-dept/add-dept.component';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { TranslateService } from '@ngx-translate/core';
import { deleteEntityTimes } from '@shared/utils/obj';

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

  loadNode(node: DynamicFlatNode) {
    const index = this.data.indexOf(node);
    this.database.children(node.id).subscribe(r => {
      node.isLoading = false;

      if (!r || r.length <= 0) {
        return;
      }

      this.data.splice(index + 1, 1, ...r);
      // notify the change
      this.dataChange.next(this.data);
    });
  }

  deleteNode(node: DynamicFlatNode) {
    const index = this.data.indexOf(node);
    this.data.splice(index, 1);
    this.dataChange.next(this.data);
  }

  updateNode(node: DynamicFlatNode, item: OrgDept) {
    const old = this.data.find(e => e.id == node.id);
    if (old) {
      old.item = item;
      this.dataChange.next(this.data);
    }
  }

  addNode(node: DynamicFlatNode, item: OrgDept) {
    const addNode = new DynamicFlatNode(item.id, item, item.level, item.sourceList, true);
    const children = this.data.filter(e => e.item.parentId === node.id);
    let pos = 0;
    if (children.length <= 0) {
      //没有子级，就在自己下面添加
      pos = this.data.indexOf(node);
    } else {
      //有子级，找到最后面的子级添加
      const anchor = children[children.length - 1];
      pos = this.data.indexOf(anchor);
    }
    this.data.splice(pos + 1, 0, addNode);
    this.dataChange.next(this.data);
  }
}

export class DeptDataSource extends DataSource<OrgDept> {
  dataChange: BehaviorSubject<OrgDept[]> = new BehaviorSubject<OrgDept[]>([]);

  constructor() {
    super();
  }

  connect(): Observable<OrgDept[]> {
    return this.dataChange;
  }

  disconnect() {}

  setData(list: OrgDept[]) {
    this.dataChange.next(list);
  }
}

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss'],
  providers: [DynamicDatabase],
})
export class DeptComponent implements OnInit {
  displayedColumns = ['no', 'name', 'recruit', 'updateAt', 'assignFor', 'operation'];
  dataSource: any;
  userDataSource!: DeptDataSource;
  selectedDeptId!: number;
  selectedNode!: DynamicFlatNode;

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private logger: NGXLogger,
    private mtxDialog: MtxDialog,
    private database: DynamicDatabase,
    private svc: DeptService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  ngOnInit() {
    this.userDataSource = new DeptDataSource();
    this.loadTree();
  }

  loadTree() {
    this.database.initialData().subscribe(r => {
      this.dataSource.data = r;
    });
  }
  onClickDept(node: DynamicFlatNode) {
    this.selectedDeptId = node.id;
    this.selectedNode = node;
    this.svc.findPostByDept(node.id).subscribe(r => {
      this.userDataSource.setData(r);
    });
  }

  onDeleteDept(node: DynamicFlatNode) {
    this.mtxDialog.confirm(this.translate.stream('common.confirm_delete'), node.item.name, () => {
      this.svc.deleteById(node.item.id).subscribe(r => {
        if (r) {
          this.dataSource.deleteNode(node);
        }
      });
    });
  }

  onEditDept(node: DynamicFlatNode) {
    const dept = node.item;
    const data = JSON.parse(JSON.stringify(dept)) as typeof dept;

    deleteEntityTimes(data);

    this.dialog
      .open(AddDeptComponent, { width: '400px', data })
      .afterClosed()
      .subscribe(r => {
        if (r) {
          this.svc.getDetail(data.id).subscribe(n => {
            this.dataSource.updateNode(node, n);
          });
        }
      });
  }

  onAddDept(node: DynamicFlatNode) {
    const parent = node.item;
    this.dialog
      .open(AddDeptComponent, { width: '400px', data: { parentId: parent.id } })
      .afterClosed()
      .subscribe(r => {
        console.log('add', r);
        if (r) {
          // r as id
          this.svc.getDetail(r).subscribe(n => {
            this.dataSource.addNode(node, n);
          });
        }
      });
  }

  onAddPost() {
    const dept = this.selectedNode.item;
    this.dialog
      .open(AddPostComponent, { data: dept })
      .afterClosed()
      .subscribe(r => {});
  }

  onSync() {
    this.logger.info('sync');
    // this.svc.sync().subscribe(r => {
    //   this.logger.info('sync=>', r);
    //   this.database.initialData().subscribe(r2 => {
    //     this.dataSource.data = r2;
    //   });
    // });
  }

  onSyncUser() {
    this.logger.info('syncUser');
    // this.svc.syncUser().subscribe(r => {
    // this.logger.info('syncUser=>', r);
    // this.database.initialData().subscribe(r2 => {
    //   this.userDataSource.setData(r2);
    // });
    // });
  }

  onEditPost(row: OrgPost) {
    const data = JSON.parse(JSON.stringify(row)) as typeof row;

    delete data.createBy;
    delete data.createAt;
    delete data.updateAt;
    delete data.updateBy;

    this.dialog
      .open(AddPostComponent, {
        width: '400px',
        data,
      })
      .afterClosed()
      .subscribe(btn => {
        if (btn) {
          this.svc.findPostByDept(this.selectedDeptId).subscribe(r => {
            this.userDataSource.setData(r);
          });
        }
      });
  }
  onDeletePost(row: OrgPost) {
    if (!this.selectedDeptId) {
      return;
    }
    this.mtxDialog.confirm(this.translate.stream('common.confirm_delete'), row.name, () => {
      this.svc.deletePost(row.id).subscribe(res => {
        if (res) {
          this.svc.findPostByDept(this.selectedDeptId).subscribe(r => {
            this.userDataSource.setData(r);
          });
        }
      });
    });
  }
}
