import { Component, OnInit } from '@angular/core';
import { SysBasic, api } from './basic.api';
import { BasicService } from './basic.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  basic!: SysBasic;
  locales: any[] = [];
  // timezones: any[] = [];

  constructor(private srv: BasicService) {
    // this.locales.push({ value: 'zh-Hans', label: '中国-简体' });
    // this.locales.push({ value: 'zh-Hant', label: '中国-繁体' });
    /** UTC (协调世界时) 	时区 	国家 	时区主要城市 */
    // this.timezones.push({ value: 'UTC+8', label: 'Asia/Shanghai' });
  }

  ngOnInit() {
    this.srv.findLocales().subscribe(r => {
      this.locales = r;
    });

    this.srv.getDetail(api.findById).subscribe(r => {
      this.basic = r;
    });
  }

  modelChange() {
    this.srv.updateItem(api.update, this.basic).subscribe(r => {
      console.log('=>', r);
    });
  }
}
