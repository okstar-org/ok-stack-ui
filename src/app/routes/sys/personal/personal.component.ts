import { Component, OnInit } from '@angular/core';
import { SysSetPersonal, api } from './personal.api';
import { PersonalService } from './personal.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  personal!: SysSetPersonal;

  locales: any[] = [];

  constructor(
    private personalSrv: PersonalService,
    private langSrv: TranslateService
  ) {}

  ngOnInit() {
    this.personalSrv.languages().subscribe(r => {
      this.locales = r;
    });

    this.personalSrv.getPersonal().subscribe(r => {
      this.personal = r;
    });
  }

  personalChange() {
    this.langSrv.use(this.personal.language);
    this.personalSrv.updatePersonal(this.personal).subscribe(r => {
      console.log('=>', r);
    });
  }
}
