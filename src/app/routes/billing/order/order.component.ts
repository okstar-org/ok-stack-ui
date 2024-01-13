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
  columns: MtxGridColumn[] = [
    { header: this.translate.stream('common.no'), field: 'no', width: '150px' },
    { header: this.translate.stream('common.descr'), field: 'name' },
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
      header: this.translate.stream('common.date'),
      field: 'createAt',
      width: '160px',
      formatter: row => {
        return this.datePipe.transform(row.createAt, 'yyyy-MM-dd HH:mm:ss');
      },
    },
    {
      header: this.translate.stream('common.status'),
      field: 'paymentStatus',
      formatter: (rowData: any) => {
        return this.translate.instant('common.' + rowData.paymentStatus);
      },
      width: '120px',
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
}
