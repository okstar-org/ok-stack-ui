import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { WebsiteInfo } from 'app/routes/sys/personal/settings.api';
import { ProfileLanguageService } from './language.service';

@Component({
  selector: 'app-profile-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class ProfileLanguageComponent implements OnInit {
  reactiveForm = this.fb.nonNullable.group({
    language: ['', [Validators.required]],
  });

  locales: any[] = [];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    private langSrv: ProfileLanguageService,
    private transSrv: TranslateService
  ) {}

  ngOnInit() {
    this.langSrv.languages().subscribe(r => {
      this.locales = r;
    });

    this.langSrv.getLanguage().subscribe(r => {
      this.reactiveForm.get('language')?.setValue(r);
    });
  }

  onSubmit() {
    const { language } = this.reactiveForm.value;
    if (!language) {
      return;
    }
    this.langSrv.updateLanguage(language).subscribe(r => {
      console.log('=>', r);
    });
  }

  personalChange() {
    const { language } = this.reactiveForm.value;
    if (!language) {
      return;
    }

    this.transSrv.use(language);
    this.langSrv.updateLanguage(language).subscribe(r => {
      console.log('=>', r);
    });
  }
}
