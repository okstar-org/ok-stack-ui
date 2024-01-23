import { NGXLogger } from 'ngx-logger';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SettingsService } from '@core';
import { Subscription } from 'rxjs';

import { DashboardService } from './dashboard.srevice';
import { StaffService } from '../org/staff/staff.service';
import { DeptService } from '../org/dept/dept.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.dashboardSrv.getData();

  messages = this.dashboardSrv.getMessages();

  charts = this.dashboardSrv.getCharts();
  chart1 = null;
  chart2 = null;

  stats = this.dashboardSrv.getStats();

  notifySubscription = Subscription.EMPTY;

  constructor(
    private dashboardSrv: DashboardService,
    private settings: SettingsService,
    private logger: NGXLogger,
    private staffSrv: StaffService,
    private deptSrv: DeptService
  ) {}

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(res => {
      this.logger.debug(res);
    });

    this.staffSrv.count().subscribe(r => {
      this.stats[0].amount = r + '';
    });
    this.deptSrv.count().subscribe(r => {
      this.stats[1].amount = r + '';
    });
    this.staffSrv.countPost().subscribe(r => {
      this.stats[2].amount = r + '';
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.notifySubscription.unsubscribe();
  }
}
