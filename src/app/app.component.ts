import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PreloaderService } from '@core';
import { WebsiteInfo } from './routes/sys/personal/settings.api';
import { BusDataType, BusService as BusService } from '@shared/services/ok-bus.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private preloader: PreloaderService,
    private busService: BusService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.preloader.hide();
    this.preloader.loadWebsite().subscribe((r: WebsiteInfo) => {
      console.log('Website info is: ', r);

      this.busService.setData(BusDataType.WebsiteInfo, r);

      const title = document.getElementsByTagName('title')[0];
      if (r.title && title) {
        title.textContent = r.title;
      }

      const cr = document.getElementById('copyright');
      if (r.copyright && cr) {
        cr.textContent = r.copyright;
      }

      const license = document.getElementById('license');
      if (license && r.license) {
        license.textContent = r.license;
      }

      const icon = document.getElementById('icon');
      if (icon && r.icon) {
        icon.setAttribute('href', r.icon);
      }
    });
  }
}
