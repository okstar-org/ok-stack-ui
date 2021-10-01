import { FsService } from './../app-fs/fs.service';
import { WxService } from './../app-wx/wx.service';
import { Observable } from 'rxjs';
import { DtService } from './../app-dt/dt.service';
import { Component, Input, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ConnType } from '../conn.api';
import { OkPayload } from '@shared/api/ok';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() type: ConnType;

  accessToken: { valid: boolean; accessToken: string };

  isLoadingTest = false;
  isTestYes: boolean = null;

  constructor(
    protected logger: NGXLogger,
    protected dtService: DtService,
    protected wxService: WxService,
    protected fsService: FsService
  ) {}

  ngOnInit() {}

  onSync() {
    this.logger.info('sync', this.type);

    this.isLoadingTest = true;
    this.isTestYes = null;

    let obs: Observable<OkPayload>;
    switch (this.type) {
      case ConnType.DT: {
        obs = this.dtService.sync(this.type);
        break;
      }
      case ConnType.WX: {
        obs = this.wxService.sync(this.type);
        break;
      }
      case ConnType.FS: {
        obs = this.fsService.sync(this.type);
        break;
      }
    }

    obs.subscribe(r => {
      this.logger.debug('sync=>', r);
      this.isLoadingTest = false;
    });
  }

  onTest() {
    this.logger.debug('test', this.type);

    this.isLoadingTest = true;
    this.isTestYes = null;

    let obs: Observable<OkPayload>;
    switch (this.type) {
      case ConnType.DT: {
        obs = this.dtService.test(this.type);
        break;
      }
      case ConnType.WX: {
        obs = this.wxService.test(this.type);
        break;
      }
      case ConnType.FS: {
        obs = this.fsService.test(this.type);
        break;
      }
    }

    obs.subscribe(r => {
      this.logger.debug('test=>', r);
      this.accessToken = JSON.parse(r.data);
      this.isLoadingTest = false;
      this.isTestYes = this.accessToken.valid;
    });
  }
}
