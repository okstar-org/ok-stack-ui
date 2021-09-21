import { Observable } from 'rxjs';
import { AppInfo } from '../conn.api';
import { WxService } from './wx.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { ConnType } from '../conn.api';
import { OkOnSave } from '@shared/components/ok/ok-on-save';
import { OkPayload } from '@shared/api/ok';

@Component({
  selector: 'app-wx',
  templateUrl: './wx.component.html',
  styleUrls: ['./wx.component.scss'],
})
export class WxComponent extends OkItemComponent implements OnInit, OkOnSave {
  form: FormGroup;
  type = ConnType.WX;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: WxService
  ) {
    super(logger, fb, svc, {
      id: [''],
      name: [''],
      certKey: ['', [Validators.required]],
      certSecret: ['', [Validators.required]],
      type: [ConnType.WX, [Validators.required]],
    });

    this.form = this.group;
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.svc.findByType(ConnType.WX).subscribe(r => {
      const data: AppInfo = r.data;
      this.form.get('name').setValue(data.name);
      this.form.get('certKey').setValue(data.certKey);
      this.form.get('certSecret').setValue(data.certSecret);
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
