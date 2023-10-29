import { AppInfo } from '../conn.api';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { NGXLogger } from 'ngx-logger';
import { ConnType } from '../conn.api';
import { DtService } from './dt.service';
import { OkPayload } from '@shared/api/ok';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dt',
  templateUrl: './dt.component.html',
  styleUrls: ['./dt.component.scss'],
})
export class DtComponent extends OkItemComponent implements OnInit {
  form: FormGroup;
  type = ConnType.DT;
  accessToken: string = '';

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: DtService
  ) {
    super(logger, fb, svc, {
      id: [''],
      name: [''],
      // agentId: ['', [Validators.required]],
      certKey: ['', [Validators.required]],
      certSecret: ['', [Validators.required]],
      type: [ConnType.DT, [Validators.required]],
    });
    this.form = this.group;
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.svc.findByType(ConnType.DT).subscribe(r => {
      const data: AppInfo = r.data;
      this.group.get('name')?.setValue(data.name);
      this.group.get('certKey')?.setValue(data.certKey);
      this.group.get('certSecret')?.setValue(data.certSecret);
      this.form.get('id')?.setValue(data.id);
      this.form.get('type')?.setValue(data.type);
    });
  }

  onSave() {
    this.logger.debug('save', this.form.value);

    if (!this.form.valid) {
      return;
    }

    const appInfo: AppInfo = this.form.value;

    let f: Observable<OkPayload<any>>;
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

  onTest() {
    this.logger.debug('test', this.form.value);
    this.svc.test(this.type).subscribe(r => {
      this.logger.debug('test=>', r);
      this.accessToken = r.data;
    });
  }
}
