import { DtService } from './../app-dt/dt.service';
import { Component, Input, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ConnType } from '../conn.api';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() type: ConnType;

  constructor(protected logger: NGXLogger, protected dtService: DtService) {}

  ngOnInit() {}

  onSync() {
    this.logger.info('sync', this.type);
  }

  onTest() {
    this.logger.debug('test', this.type);
    switch (this.type) {
      case ConnType.DT: {
        this.dtService.test(this.type);
      }
    }
  }
}
