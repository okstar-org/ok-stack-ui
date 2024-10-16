import { Component, OnInit } from '@angular/core';
import { WebsiteInfo, api } from './settings.api';
import { SettingsService } from './settings.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  reactiveForm = this.fb.group({
    title: [''],
    license: [''],
    copyright: [''],
  });

  constructor(
    protected fb: FormBuilder,
    private toastr: ToastrService,
    private transalteService: TranslateService,
    private settingsSrv: SettingsService
  ) {}

  ngOnInit() {
    this.settingsSrv.load().subscribe(r => {
      this.reactiveForm.setValue(r);
    });
  }

  onSubmit() {
    const data = this.reactiveForm.value as WebsiteInfo;
    this.settingsSrv.update(data).subscribe(r => {
      console.log('=>', r);
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      }
    });
  }
}
