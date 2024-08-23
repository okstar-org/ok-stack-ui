import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from './detail.service';
import { OrderResultEntity, SysWorkAppDetail, SysWorkAppPlan } from '../work.api';
import { MatDialog } from '@angular/material/dialog';
import { PayComponent } from '../pay/pay.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id = '';
  app!: SysWorkAppDetail;

  constructor(
    private dialog: MatDialog,
    private activedRoute: ActivatedRoute,
    private svc: DetailService
  ) {}
  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      console.log('params=>', params);
      this.id = params.id;
      this.init();
    });
  }

  init() {
    console.log(this.id);
    this.svc.getDetail(this.id).subscribe(r => {
      console.log('r=>', r);
      this.app = r;
    });
  }

  onBuy(plan: SysWorkAppPlan) {
    /**
     * 1、请求购买
     * 2、返回地址
     */
    this.svc.create(plan.uuid).subscribe(r => {
      this.dialog
        .open(PayComponent, { data: r, disableClose: true, width: '920px', height: '460px' })
        .afterClosed()
        .subscribe(r => {});
    });
  }
}
