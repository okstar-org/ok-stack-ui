import { OkResult } from './../../../shared/api/ok';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsiteInfo, UploadItem } from './settings.api';
import { SettingsService } from './settings.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { BusDataType, BusService } from '@shared/services/ok-bus.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  uploadMap = new Map<string, UploadItem>();
  urlMap = new Map<string, string>();

  reactiveForm = this.fb.group({
    title: [''],
    license: [''],
    copyright: [''],
    name: [''],
    icon: [''],
    logo: [''],
  });

  constructor(
    protected fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateService,
    private busService: BusService,
    private settingsSrv: SettingsService
  ) {
    this.urlMap.set('icon', '/api/sys/upload/favicon');
    this.urlMap.set('logo', '/api/sys/upload/logo');
  }

  ngOnInit() {
    this.settingsSrv.load().subscribe(r => {
      this.reactiveForm.setValue(r);
    });
  }

  public ngOnDestroy(): void {}

  getFile(field: string) {
    return this.uploadMap.get(field);
  }

  onFileSelected(event: Event, field: string) {
    if (!event.target) {
      return;
    }

    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const file: File = input.files[0];
    if (file) {
      const url = this.urlMap.get(field);
      if (!url) return;
      this.uploadMap.set(field, { file, url });
    }
  }

  onSubmit() {
    const obs: Observable<OkResult<string>>[] = [];
    this.uploadMap.forEach((upload, field) => {
      const formData = new FormData();
      formData.append('file', upload.file);
      const ob = this.http.put<OkResult<string>>(upload.url, formData).pipe(
        tap((r: OkResult<string>) => {
          if (r.success) this.reactiveForm.get(field)?.setValue(r.data);
        })
      );
      obs.push(ob);
    });
    if (obs.length > 0) {
      combineLatest(obs).subscribe(r => this.saveInfo());
    } else this.saveInfo();
  }

  saveInfo() {
    const data = this.reactiveForm.value as WebsiteInfo;
    this.settingsSrv.update(data).subscribe(r => {
      if (r) {
        this.busService.setData(BusDataType.WebsiteInfo, this.reactiveForm.value);
        this.toastr.success(this.translate.instant('common.success'));
      }
    });
  }
}
