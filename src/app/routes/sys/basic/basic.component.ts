import { Component, OnInit } from '@angular/core';
import { SysSetGlobal, SysSetPersonal, api } from './basic.api';
import { BasicService } from './basic.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLangService } from '@core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  global!: SysSetGlobal;
  personal!: SysSetPersonal;

  locales: any[] = [];
  // timezones: any[] = [];

  constructor(
    private basicSrv: BasicService,
    private langSrv: TranslateService
  ) {}

  ngOnInit() {
    this.basicSrv.languages().subscribe(r => {
      this.locales = r;
    });
    this.basicSrv.getDetail('').subscribe(r => {
      this.global = r;
    });
    this.basicSrv.getPersonal().subscribe(r => {
      this.personal = r;
    });
  }

  personalChange() {
    this.langSrv.use(this.personal.language);
    this.basicSrv.updatePersonal(this.personal).subscribe(r => {
      console.log('=>', r);
    });
  }

  globalChange() {
    this.basicSrv.updateItem(api.update, this.global).subscribe(r => {
      console.log('=>', r);
    });
  }
}
