import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PreloaderService } from '@core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private preloader: PreloaderService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.preloader.hide();
    this.preloader.loadWebsite().subscribe(r => {
      console.log('Website info is: ', r);
      const title = document.getElementsByTagName('title')[0];
      if (title) {
        title.textContent = r.title;
      }

      const cr = document.getElementById('copyright');
      if (cr) {
        cr.textContent = r.copyright;
      }

      const license = document.getElementById('license');
      if (license) {
        license.textContent = r.license;
      }
    });
  }
}
