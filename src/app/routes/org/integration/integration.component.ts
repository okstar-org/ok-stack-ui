import { Component, OnInit } from '@angular/core';
import { EyeIconState, SysConfIntegration, api } from './integration.api';
import { IntegrationService } from './integration.service';
import { TranslateService } from '@ngx-translate/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
})
export class IntegrationComponent implements OnInit {
  integrations: SysConfIntegration[] = [];
  eyeIcon: EyeIconState = {
    certKey: false,
    certSecret: false,
  };

  constructor(
    private integrationSrv: IntegrationService,
    private translateService: TranslateService,
    private clipboard: Clipboard,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.integrationSrv.getDetail('').subscribe(r => {
      this.integrations = r;
    });
  }

  onChange() {
    // this.integrationSrv.updateItem(api.update, this.integration).subscribe(r => {
    //   console.log('=>', r);
    // });
  }
  eyeIconChange(key: keyof EyeIconState) {
    this.eyeIcon[key] = !this.eyeIcon[key];
  }
  copy(text: string) {
    const copied = this.clipboard.copy(text);
    if (copied) {
      this.toastr.success(this.translateService.instant('common.copied'));
    }
  }

  onSync() {
    // this.logger.info('sync');
    // this.svc.sync().subscribe(r => {
    //   this.logger.info('sync=>', r);
    //   this.database.initialData().subscribe(r2 => {
    //     this.dataSource.data = r2;
    //   });
    // });
  }

  onSave(item: SysConfIntegration) {}

  onTest(item: SysConfIntegration) {
    this.integrationSrv.test(item.type, item).subscribe(r => {
      if (r) {
        alert(this.translateService.instant('common.success'));
      } else {
        alert(this.translateService.instant('common.failure'));
      }
    });
  }
}
