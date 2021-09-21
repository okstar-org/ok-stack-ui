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

  constructor(protected logger: NGXLogger) {}

  ngOnInit() {}

  onSync() {
    this.logger.info('sync', this.type);
  }
}
