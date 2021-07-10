import { NGXLogger } from 'ngx-logger';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import { DTO, SalesleadService } from './saleslead.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MtxGridColumn } from '@ng-matero/extensions';
import { PageEvent } from '@angular/material/paginator';
import { AddComponent } from './dialog/add/add.component';

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
      header: '客户名称',
      field: 'customerName',
      sortable: true,
      formatter: (data: any) =>
        `<a href="${data.html_url}" target="_blank">${data.customerName}</a>`,
    },
    { header: '联系人姓名', field: 'contactName', sortable: true },
    { header: '手机号码', field: 'mobilePhone', sortable: true },
    { header: '归属人员', field: 'ownerName', sortable: true },
    { header: '线索来源', field: 'leadFrom', sortable: true },
    { header: '线索状态', field: 'leadState', sortable: true },
    { header: '最后跟进', field: 'lastFollowUpTime', sortable: true, type: 'date' },
    { header: '未跟进天数', field: 'unFollowUpDays', sortable: true, type: 'number' },
    {
      header: '操作',
      field: 'operation',
      minWidth: 220,
      width: '220px',
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
    private service: SalesleadService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
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

    // setTimeout(()=>{
    //   this.openDialogAdd()
    // },3000)
    this.getParams();
  }

  ngOnDestroy() {
    // this.translateSubscription.unsubscribe();
  }

  getParams() {
    this.service.getParams().subscribe(res => {
      this.logger.debug('getParams', res);
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

    const data: DTO = {
      isCreateFollowUpTask: false,
      customerName: '',
      customerState: 0,
      avatar: '',
      contactName: '',
      createdAt: new Date(),
      faxPhone: '',
      landPhone: '',
      lastFollowUpTime: new Date(),
      leadFrom: '',
      leadState: '',
      mobilePhone: '',
      nextFollowUpTime: new Date(),
      note: '',
      owner: '',
      ownerName: '',
      unFollowUpDays: null,
      mail: '',
    };
    const dialogRef = this.dialog.open(AddComponent, { data });
    const sub = dialogRef.componentInstance.emitter.subscribe(() => {
      this.getData();
    });

    dialogRef.afterClosed().subscribe(() => {
      this.logger.debug('closed');
      sub.unsubscribe();
    });
  }

  edit(data: any) {
    this.logger.debug('edit...');

    const dialogRef = this.dialog.open(AddComponent, { data });
    const sub = dialogRef.componentInstance.emitter.subscribe(() => {
      this.logger.debug('emitter');
      this.getData();
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.logger.debug('closed');
    //   sub.unsubscribe();
    // });
  }

  import() {}

  export() {}

  change() {}

  newTask() {}

  sendMessage() {}
}