import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { NGXLogger } from 'ngx-logger';
import { ConnType } from '../conn.api';
import { DtService } from './dt.service';

@Component({
  selector: 'app-dt',
  templateUrl: './dt.component.html',
  styleUrls: ['./dt.component.scss'],
})
export class DtComponent extends OkItemComponent implements OnInit {
  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: DtService
  ) {
    super(logger, fb, svc, {
      name: [''],
      agentId: ['', [Validators.required]],
      appKey: ['', [Validators.required]],
      appSecret: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.svc.findByType(ConnType.DT).subscribe(r => {
      const data: { name: string; certKey: string; certSecret: string } = r.data;
      this.group.get('name').setValue(data.name);
      this.group.get('appKey').setValue(data.certKey);
      this.group.get('appSecret').setValue(data.certSecret);
    });
  }

  onSave() {}
}
