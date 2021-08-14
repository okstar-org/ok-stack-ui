import { supports } from './../../../shared/utils/support';
import { NGXLogger } from 'ngx-logger';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { SalesleadService } from './saleslead.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MtxGridColumn } from '@ng-matero/extensions';
import { PageEvent } from '@angular/material/paginator';
import { AddComponent } from './dialog/add/add.component';
import { ImportComponent } from './dialog/import/import.component';
import { Form } from './lead.api';

@Component({
  selector: 'app-saleslead',
  templateUrl: './saleslead.component.html',
  styleUrls: ['./saleslead.component.scss'],
  providers: [SalesleadService],
})
export class SalesleadComponent implements OnInit, OnDestroy {
  type = 'moment';

  group: FormGroup;

  translateSubscription: Subscription;

  backParams = {};

  list = [];
  total = 0;
  isLoading = true;
  rowSelectable = true;
  columnHideable = true;
  columnMovable = true;
  multiSelectable = true;
  showToolbar = true;

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('crm.saleslead.customerName'),
      field: 'customerName',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.contactName'),
      field: 'contactName',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.mobilePhone'),
      field: 'mobilePhone',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.ownerName'),
      field: 'ownerName',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.leadFrom'),
      field: 'leadFrom',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.leadState'),
      field: 'leadState',
      sortable: true,
    },
    {
      header: this.translate.stream('crm.saleslead.lastFollowUpTime'),
      field: 'lastFollowUpTime',
      sortable: true,
      type: 'date',
    },
    {
      header: this.translate.stream('crm.saleslead.unFollowUpDays'),
      field: 'unFollowUpDays',
      sortable: true,
      type: 'number',
    },
    {
      header: '操作',
      field: 'operation',
      minWidth: 180,
      width: '200px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'chat',
          text: '跟进',
          popTitle: '跟进',
          tooltip: '跟进',
        },
        {
          color: 'primary',
          icon: 'edit',
          text: this.translate.stream('table_kitchen_sink.edit'),
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
          // pop: true,
          // popTitle: this.translate.stream('table_kitchen_sink.edit'),
          // popCloseText: this.translate.stream('table_kitchen_sink.edit'),
          // popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.edit(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          popCloseText: this.translate.stream('table_kitchen_sink.close'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.delete(record),
        },
        {
          color: 'accent',
          icon: 'arrow_upward',
          text: '置顶',
          tooltip: '置顶',
          // pop: true,
          // popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          // popCloseText: this.translate.stream('table_kitchen_sink.close'),
          // popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.top(record),
        },
      ],
    },
  ];

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private service: SalesleadService,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.group = this.fb.group({
      sort: 'ordinal,desc',
      page: 0,
      size: 10,

      keyword: '',
      ownerName: '',
      leadState: '',
      leadFrom: '',
      lastFollowUpTime: [null],
    });

    // this.group.addControl('sort', {});
    // this.group = fb.group({
    //   dateTimeYear: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
    //   date: [null, Validators.required],
    //   time: [null, Validators.required],
    //   timeAMPM: [null, Validators.required],
    //   month: [null, Validators.required],
    //   year: [null, Validators.required],
    //   mintest: [this.today, Validators.required],
    //   filtertest: [this.today, Validators.required],
    //   touch: [null, Validators.required],
    // });
  }

  ngOnInit() {
    this.getData();
    this.loadBackParams();
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  loadBackParams() {
    this.service.getParams().subscribe(res => {
      this.backParams = res.data;
    });
  }

  getData() {
    this.isLoading = true;

    this.service.getData(this.params).subscribe(
      res => {
        this.list = res.data.content;
        this.total = res.data.totalElements;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }

  get params() {
    const p = Object.assign({}, this.group.value);
    return p;
  }

  get pageIndex() {
    return this.group.get('page').value;
  }

  get pageSize() {
    return this.group.get('size').value;
  }

  getBackParams(param) {
    return this.backParams[param];
  }

  delete(record) {
    this.logger.info('delete...', record);
    this.service.delete(record).subscribe(r => {
      this.logger.debug('delete==>', r);
      this.getData();
    });
  }

  getNextPage(e: PageEvent) {
    this.group.get('page').setValue(e.pageIndex);
    this.group.get('size').setValue(e.pageSize);
    this.getData();
  }

  resetPage() {
    this.group.get('page').setValue(0);
    this.group.get('size').setValue(10);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  top(e: any) {
    this.service.top(e).subscribe(r => {
      this.logger.debug('top==>', r);
      this.getData();
    });
  }

  search() {
    this.group.get('page').setValue(0);
    this.getData();
  }

  reset() {
    this.group.reset();
    this.resetPage();
    this.getData();
  }

  add() {
    this.logger.debug('add...');
    const data: Form = {
      isCreateFollowUpTask: false,
      customerName: ['', Validators.required],
      contactName: ['', Validators.required],
      customerState: 0,
      avatar: '',
      faxPhone: [null],
      landPhone: [null],
      mobilePhone: [null],
      lastFollowUpTime: new Date(),
      leadFrom: null,
      leadState: null,
      nextFollowUpTime: new Date(),
      note: '',
      owner: '',
      ownerName: '',
      unFollowUpDays: null,
      mail: [null, Validators.email],
    };
    const dialogRef = this.dialog.open(AddComponent, { data });
    dialogRef.componentInstance.emitter.subscribe(() => {
      this.getData();
      dialogRef.close();
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.logger.debug('closed');
    //   sub.unsubscribe();
    // });
  }

  edit(data: any) {
    this.logger.debug('edit...');

    const dialogRef = this.dialog.open(AddComponent, { data });
    dialogRef.componentInstance.emitter.subscribe(() => {
      this.getData();
      dialogRef.close();
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.logger.debug('closed');
    //   sub.unsubscribe();
    // });
  }

  import() {
    this.logger.debug('import...');

    const dialogRef = this.dialog.open(ImportComponent, {});
    dialogRef.componentInstance.emitter.subscribe(() => {
      this.getData();
      dialogRef.close();
    });
  }

  export() {
    if (!supports.canDownload()) {
      this.translate.get('support.can_not').subscribe(r => {
        alert(r);
      });
      return;
    }
    this.service.getExport(this.params, '客户管理-销售线索-导出.xls');
  }

  change() {}

  newTask() {}

  sendMessage() {}
}
