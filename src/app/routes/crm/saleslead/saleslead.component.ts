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
    page: -1,
    size: 10,
  };
  get params() {
    const p = Object.assign({}, this.q);
    p.page += 1;
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
    { header: '手机号码', field: 'mobilePhone', type: 'image' },
    { header: '归属人员', field: 'landPhone', width: '300px' },
    { header: '线索状态', field: 'stargazers_count', type: 'number' },
    { header: '最后跟进', field: 'forks_count1', type: 'number' },
    { header: '未跟进天数', field: 'score', type: 'number' },
    { header: '操作', field: 'open_issues', type: 'number' },
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
}
