import { NGXLogger } from 'ngx-logger';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SettingsService } from '@core';
import { Subscription } from 'rxjs';

import { DashboardService } from './dashboard.srevice';

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
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(res => {
      this.logger.debug(res);
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.notifySubscription.unsubscribe();
  }
}
