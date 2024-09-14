import { Component, OnInit } from '@angular/core';
import {
  EyeIconState,
  SysConfIntegration,
  SysConfIntegrationIm,
  SysConfIntegrationKeycloak,
  SysConfIntegrationStack,
  api,
} from './integration.api';
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
  integration!: SysConfIntegration;
  eyeIcon: EyeIconState = {
    password: false,
    clientSecret: false,
    apiSecret: false,
  };
  constructor(
    private integrationSrv: IntegrationService,
    private transalteService: TranslateService,
    private clipboard: Clipboard,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.integrationSrv.getDetail('').subscribe(r => {
      this.integration = r;
    });
  }

  onChange() {
    this.integrationSrv.updateItem(api.update, this.integration).subscribe(r => {
      console.log('=>', r);
    });
  }

  onStackSave(stack: SysConfIntegrationStack) {
    this.integrationSrv.saveStack(stack).subscribe(r => {
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      }
    });
  }

  onStackTest(stack: SysConfIntegrationStack) {
    this.integrationSrv.testStack(stack).subscribe(r => {
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      } else {
        this.toastr.warning(this.transalteService.instant('common.failure'));
      }
    });
  }

  onKeycloakSave(kc: SysConfIntegrationKeycloak) {
    this.integrationSrv.saveKeycloak(kc).subscribe(r => {
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      }
    });
  }

  onKeycloakTest(kc: SysConfIntegrationKeycloak) {
    this.integrationSrv.testKeycloak(kc).subscribe(r => {
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      } else {
        this.toastr.warning(this.transalteService.instant('common.failure'));
      }
    });
  }

  onImSave(im: SysConfIntegrationIm) {
    this.integrationSrv.saveIm(im).subscribe(r => {
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      }
    });
  }

  onImTest(im: SysConfIntegrationIm) {
    this.integrationSrv.testIm(im).subscribe(r => {
      if (r) {
        this.toastr.success(this.transalteService.instant('common.success'));
      } else {
        this.toastr.warning(this.transalteService.instant('common.failure'));
      }
    });
  }

  eyeIconChange(key: keyof EyeIconState) {
    this.eyeIcon[key] = !this.eyeIcon[key];
  }
  copy(text: string) {
    const copied = this.clipboard.copy(text);

    if (copied) {
      this.toastr.success('复制成功');
    }
  }
}
