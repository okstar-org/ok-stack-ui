import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { SalesleadService } from './saleslead.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatetimepickerFilterType } from '@mat-datetimepicker/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MtxGridColumn } from '@ng-matero/extensions';
import { PageEvent } from '@angular/material/paginator';

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
  q = {
    keyword: '',
    owner: '',
    state: '',
    from: '',
    sort: 'id',
    order: 'desc',
    page: 0,
    size: 10,
  };
  get params() {
    const p = Object.assign({}, this.q);
    // p.page += 1;
    return p;
  }
  columns: MtxGridColumn[] = [
    {
      header: '客户名称',
      field: 'customerName',
      formatter: (data: any) =>
        `<a href="${data.html_url}" target="_blank">${data.customerName}</a>`,
    },
    { header: '联系人姓名', field: 'contactName' },
    { header: '手机号码', field: 'mobilePhone' },
    { header: '归属人员', field: 'ownerName', width: '300px' },
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
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.edit'),
          popCloseText: this.translate.stream('table_kitchen_sink.edit'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
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
          // click: record => this.delete(record),
        },
        {
          color: 'accent',
          icon: 'arrow_upward',
          text: '置顶',
          tooltip: '置顶',
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          popCloseText: this.translate.stream('table_kitchen_sink.close'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
        },
      ],
    },
  ];

  constructor(
    private salesleadSrv: SalesleadService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
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
    this.group = fb.group({
      keyword: '',
      owner: '',
      state: '',
      from: '',
      sort: 'id',
      order: 'desc',
      page: 0,
      size: 10,
      date: [null, Validators.required],
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
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
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

  getNextPage(e: PageEvent) {
    this.q.page = e.pageIndex;
    this.q.size = e.pageSize;
    this.getData();
  }

  search() {
    this.q.page = 0;
    this.getData();
  }
}
