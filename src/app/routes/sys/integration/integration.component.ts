import { Component, OnInit } from '@angular/core';
import { SysConfIntegration, api } from './integration.api';
import { IntegrationService } from './integration.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
})
export class IntegrationComponent implements OnInit {
  integration!: SysConfIntegration;

  constructor(
    private integrationSrv: IntegrationService,
    private langSrv: TranslateService
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
}
