import { Res } from './../../../core/authentication/interface';
import { Component, OnInit } from '@angular/core';
import { AppmgtService } from './appmgt.service';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appmgt',
  templateUrl: './appmgt.component.html',
  styleUrls: ['./appmgt.component.scss'],
})
export class AppmgtComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: '', field: 'avatar', type: 'image', width: '50px' },
    { header: this.translate.stream('common.name'), field: 'name' },
    { header: this.translate.stream('common.descr'), field: 'descr', width: '300px' },
    { header: this.translate.stream('common.provider'), field: 'author' },
    { header: this.translate.stream('common.email'), field: 'mail' },
    { header: this.translate.stream('common.website'), field: 'homePage', type: 'link' },
    {
      header: '',
      field: 'operation',
      width: '80px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'input',
          text: '使用',
          tooltip: '付款购买及使用',
          click: data => {
            this.router.navigateByUrl(`/work/app/${data.uuid}`);
          },
        },
      ],
    },
  ];
  list: any[] = [];
  total = 0;
  isLoading = false;
  noResultText = '';
  query = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor(
    private translate: TranslateService,
    private router: Router,
    private appService: AppmgtService
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
    this.appService.page(this.query).subscribe({
      next: res => {
        this.list = res.list;
        this.total = res.totalCount;
        this.isLoading = false;
      },
      error: res => {
        const { error } = res;
        const d = error as Res;
        this.noResultText = d.msg;
        this.isLoading = false;
      },
    });
  }
}
