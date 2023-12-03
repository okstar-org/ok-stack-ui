import { SysSetPersonal } from './../../routes/sys/basic/basic.api';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@core';
import { BasicService } from './../../routes/sys/basic/basic.service';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue" (click)="useLanguage(lang.key)">
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
})
export class TranslateComponent {
  langs: Map<string, string> = new Map<string, string>();

  constructor(
    private translate: TranslateService,
    private settings: SettingsService,
    private basic: BasicService
  ) {
    this.basic.findLocales().subscribe(r => {
      r.forEach(e => {
        this.langs.set(e.value, e.label);
        this.translate.langs.push(e.value);
      });

      this.basic.getPersonal().subscribe((r: SysSetPersonal) => {
        this.useLanguage(r.locale);
      });
    });
  }

  useLanguage(language: string) {
    console.log('use', language);
    this.translate.use(language);
    this.settings.setLanguage(language);
  }
}
