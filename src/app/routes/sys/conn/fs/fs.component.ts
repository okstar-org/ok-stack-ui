import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { OkItemComponent } from '@shared/components/ok/ok-item.component';
import { NGXLogger } from 'ngx-logger';
import { ConnType } from '../conn.api';
import { WxService } from '../wx/wx.service';
import { FsService } from './fs.service';

@Component({
  selector: 'app-fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.scss'],
})
export class FsComponent extends OkItemComponent implements OnInit {
  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: FsService
  ) {
    super(logger, fb, svc, {
      name: [''],
      appKey: ['', [Validators.required]],
      appSecret: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.svc.findByType(ConnType.FS).subscribe(r => {
      const data: { name: string; certKey: string; certSecret: string } = r.data;
      this.group.get('name').setValue(data.name);
      this.group.get('appKey').setValue(data.certKey);
      this.group.get('appSecret').setValue(data.certSecret);
    });
  }

  onSave() {}
}
