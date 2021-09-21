import { AppInfo } from '../conn.api';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { NGXLogger } from 'ngx-logger';
import { ConnType } from '../conn.api';
import { WxService } from '../app-wx/wx.service';
import { FsService } from './fs.service';
import { Observable } from 'rxjs';
import { OkPayload } from '@shared/api/ok';
import { OkOnSave } from '@shared/components/ok/ok-on-save';

@Component({
  selector: 'app-fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.scss'],
})
export class FsComponent extends OkItemComponent implements OnInit, OkOnSave {
  form: FormGroup;
  type = ConnType.FS;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: FsService
  ) {
    super(logger, fb, svc, {
      id: [''],
      name: [''],
      certKey: ['', [Validators.required]],
      certSecret: ['', [Validators.required]],
      type: [ConnType.FS, [Validators.required]],
    });
    this.form = this.group;
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.svc.findByType(ConnType.FS).subscribe(r => {
      const data: AppInfo = r.data;
      this.group.get('name').setValue(data.name);
      this.group.get('certKey').setValue(data.certKey);
      this.group.get('certSecret').setValue(data.certSecret);
      this.form.get('id').setValue(data.id);
      this.form.get('type').setValue(data.type);
    });
  }

  onSave() {
    this.logger.debug('save', this.form.value);

    if (!this.form.valid) {
      return;
    }

    const appInfo: AppInfo = this.form.value;

    let f: Observable<OkPayload>;
    if (!appInfo.id) {
      f = this.svc.save(appInfo);
    } else {
      f = this.svc.update(appInfo);
    }

    f.subscribe(r => {
      this.logger.info('==>', r);
      this.loadForm();
    });
  }
}
