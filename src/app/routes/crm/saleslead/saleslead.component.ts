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
import { MatDatetimepickerFilterType } from '@mat-datetimepicker/core';
import * as moment from 'moment';
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
  today: moment.Moment;
  tomorrow: moment.Moment;
  min: moment.Moment;
  max: moment.Moment;
  start: moment.Moment;
  filter: (date: moment.Moment, type: MatDatetimepickerFilterType) => boolean;

  translateSubscription: Subscription;

  list = [];
  total = 0;
  isLoading = true;

  columns: MtxGridColumn[] = [
    {
      header: '客户名称',
      field: 'customerName',
      formatter: (data: any) =>
        `<a href="${data.html_url}" target="_blank">${data.customerName}</a>`,
    },
    { header: '联系人姓名', field: 'contactName', sortable: true },
    { header: '手机号码', field: 'mobilePhone' },
    { header: '归属人员', field: 'ownerName' },
    { header: '线索状态', field: 'leadState' },
    { header: '最后跟进', field: 'lastFollowUpTime', type: 'date' },
    { header: '未跟进天数', field: 'unFollowUpDays', type: 'number' },
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
    private salesleadSrv: SalesleadService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.today = moment.utc();
    this.tomorrow = moment.utc().date(moment.utc().date() + 1);
    this.min = this.today.clone().year(2018).month(10).date(3).hour(11).minute(10);
    this.max = this.min.clone().date(4).minute(45);
    this.start = this.today.clone().year(1930).month(9).date(28);
    this.filter = (date: moment.Moment, type: MatDatetimepickerFilterType) => {
      switch (type) {
        case MatDatetimepickerFilterType.DATE:
          return date.year() % 2 === 0 && date.month() % 2 === 0 && date.date() % 2 === 0;
        case MatDatetimepickerFilterType.HOUR:
          return date.hour() % 2 === 0;
        case MatDatetimepickerFilterType.MINUTE:
          return date.minute() % 2 === 0;
      }
    };
    this.group = this.fb.group({
      keyword: '',
      ownerName: '',
      leadState: '',
      leadFrom: '',
      sort: 'ordinal,desc',
      page: 0,
      size: 10,
      date: [null],
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
  }

  ngOnDestroy() {
    // this.translateSubscription.unsubscribe();
  }

  getData() {
    this.isLoading = true;

    this.salesleadSrv.getData(this.params).subscribe(
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
    this.logger.info('record', record);
    this.salesleadSrv.delete(record).subscribe(r => {
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
    this.salesleadSrv.top(e).subscribe(r => {
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
      leadFrom: 0,
      leadState: 0,
      mobilePhone: '',
      nextFollowUpTime: new Date(),
      note: '',
      owner: '',
      ownerName: '',
      unFollowUpDays: null,
      mail: '',
    };
    this.dialog.open(AddComponent, { data });
  }

  edit(data: any) {
    this.dialog.open(AddComponent, { data });
  }
}
