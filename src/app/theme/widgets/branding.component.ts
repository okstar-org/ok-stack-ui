import { BusData, BusDataType, BusService } from '@shared/services/ok-bus.service';
import { Component } from '@angular/core';
import { WebsiteInfo } from 'app/routes/sys/personal/settings.api';

@Component({
  selector: 'app-branding',
  template: `
    <a class="d-inline-block text-nowrap r-full text-reset" href="/">
      <img [src]="logo" class="brand-logo align-middle m-2 r-full" alt="logo" />
      <span class="align-middle f-s-16 f-w-500 m-x-8">{{ name }}</span>
    </a>
  `,
  styles: [
    `
      .brand-logo {
        width: 30px;
        height: 30px;
      }
    `,
  ],
})
export class BrandingComponent {
  name = 'OkStack';
  logo = './assets/images/matero.png';

  constructor(busService: BusService) {
    busService.getData().subscribe((r: BusData) => {
      console.log('received:', r);
      switch (r.type) {
        case BusDataType.WebsiteInfo:
          this.setWebsite(r.data);
          break;
      }
    });
  }

  setWebsite(x: WebsiteInfo) {
    this.name = x.name;
    this.logo = x.logo;
  }
}
