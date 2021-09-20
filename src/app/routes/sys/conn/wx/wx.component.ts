import { WxService } from './wx.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { ConnType } from '../conn.api';

@Component({
  selector: 'app-wx',
  templateUrl: './wx.component.html',
  styleUrls: ['./wx.component.scss'],
})
export class WxComponent extends OkItemComponent implements OnInit {
  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: WxService
  ) {
    super(logger, fb, svc, {
      name: [''],
      certKey: ['', [Validators.required]],
      certSecret: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.svc.findByType(ConnType.WX).subscribe(r => {
      const data: { name: string; certKey: string; certSecret: string } = r.data;
      this.group.get('name').setValue(data.name);
      this.group.get('certKey').setValue(data.certKey);
      this.group.get('certSecret').setValue(data.certSecret);
    });
  }

  onSave() {}
}
