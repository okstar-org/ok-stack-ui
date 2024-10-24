import { OkResult } from './../../../shared/api/ok';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsiteInfo, api, UploadItem } from './settings.api';
import { SettingsService } from './settings.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

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
    private transalteService: TranslateService,
    private settingsSrv: SettingsService
  ) {
    this.urlMap.set('icon', '/api/sys/upload/favicon');
    this.urlMap.set('logo', '/api/sys/upload/logo');
    // this.subscription = this.icon.valueChanges.subscribe((values: File[]) =>
    // this.getImage(values[0])
    // );
    // this.uploadedFile.subscribe(f => {
    //   console.log('file=>', f);
    // });
  }

  ngOnInit() {
    this.settingsSrv.load().subscribe(r => {
      this.reactiveForm.setValue(r);
    });
  }

  public ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  getFile(field: string) {
    return this.uploadMap.get(field);
  }

  onFileSelected(event: Event, field: string) {
    console.log(event);

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
    this.uploadMap.forEach((upload, field) => {
      const formData = new FormData();
      formData.append('file', upload.file);
      this.http.post<OkResult<string>>(upload.url, formData).subscribe((r: OkResult<string>) => {
        console.log('upload:', field, '=>', r);
        if (r.success) this.reactiveForm.get(field)?.setValue(r.data);
      });
    });

    const data = this.reactiveForm.value as WebsiteInfo;
    this.settingsSrv.update(data).subscribe(r => {
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      }
    });
  }
}
