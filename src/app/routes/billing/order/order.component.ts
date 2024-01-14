import { iif } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Router } from '@angular/router';
import { OrderService } from './order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [DatePipe],
})
export class OrderComponent implements OnInit {
  fmt = 'yy-MM-dd HH:mm:ss';
  columns: MtxGridColumn[] = [
    { header: this.translate.stream('common.no'), field: 'no', width: '150px' },
    { header: this.translate.stream('common.name'), field: 'name', minWidth: 200 },
    {
      header: this.translate.stream('common.provider'),
      field: 'providerName',
    },
    {
      header: this.translate.stream('common.amount'),
      field: 'amount',
      width: '150px',
    },
    {
      header: this.translate.stream('common.period'),
      field: 'periodBegin',
      width: '290px',
      formatter: row => {
        return (
          this.datePipe.transform(row.periodBegin, this.fmt) +
          '~' +
          this.datePipe.transform(row.periodEnd, this.fmt)
        );
      },
    },
    {
      header: this.translate.stream('common.date'),
      field: 'createAt',
      width: '160px',
      formatter: row => {
        return this.datePipe.transform(row.createAt, this.fmt);
      },
    },
    {
      header: this.translate.stream('common.orderStatus'),
      field: 'orderStatus',
      width: '120px',
      formatter: (row: any) => {
        return this.translate.instant('common.' + row.orderStatus);
      },
    },
    {
      header: this.translate.stream('common.paymentStatus'),
      field: 'paymentStatus',
      width: '120px',
      formatter: (row: any) => {
        return this.translate.instant('common.' + row.paymentStatus);
      },
    },
    {
      header: '',
      field: 'operation',
      width: '60px',
      type: 'button',
      show: false,
      pinned: 'right',

      buttons: [
        {
          type: 'icon',
          icon: 'payment',
          text: '支付',
          tooltip: '支付',
          click: row => {
            this.onBuy(row);
          },
          iif: (row: any) => {
            return row.orderStatus === 'confirmed' && row.paymentStatus === 'unpaid';
          },
        },
      ],
    },
  ];
  list: any[] = [];
  total = 0;
  isLoading = false;

  query = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor(
    private datePipe: DatePipe,
    private translate: TranslateService,
    private svc: OrderService
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  getNextPage(e: PageEvent) {
    this.query.pageIndex = e.pageIndex;
    this.query.pageSize = e.pageSize;
    this.getList();
  }
  getList() {
    this.isLoading = true;
    this.svc.page(this.query).subscribe(res => {
      this.list = res.list;
      this.total = res.totalCount;
      this.isLoading = false;
    });
  }
  onBuy(row: any) {}
}
