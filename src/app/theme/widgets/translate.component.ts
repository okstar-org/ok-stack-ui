import { SysSetPersonal } from '../../routes/sys/integration/integration.api';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@core';
import { ProfileLanguageService } from 'app/routes/profile/language/language.service';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let lang of langs | keyvalue"
        (click)="useLanguage(lang.key, true)"
      >
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
    private langSrv: ProfileLanguageService
  ) {
    this.langSrv.languages().subscribe(r => {
      r.forEach(e => {
        this.langs.set(e.value, e.label);
        this.translate.langs.push(e.value);
      });

      this.langSrv.getLanguage().subscribe(r => {
        this.useLanguage(r);
      });
    });
  }

  useLanguage(language: string, save?: boolean) {
    if (!language) {
      return;
    }
    this.translate.use(language);
    this.settings.setLanguage(language);
    if (save) {
      this.langSrv.updateLanguage(language).subscribe(r => {
        console.log('=>', r);
      });
    }
  }
}
