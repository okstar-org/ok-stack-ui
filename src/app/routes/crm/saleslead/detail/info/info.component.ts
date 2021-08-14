import { OkDetailComponent } from './../../../../../shared/components/ok/ok-detail.component';
import { map } from 'rxjs/operators';
import { OkPayload, OkApi, OkResult } from './../../../../../shared/api/ok';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { DTO, leadApi, LeadDTO } from '../../lead.api';
import { ActivatedRoute } from '@angular/router';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { InfoService } from './info.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent extends OkDetailComponent implements OnInit, OnDestroy {
  meters = [
    { name: '联系人', amount: '10' },
    { name: '跟进记录', amount: '0' },
    { name: '电话记录', amount: '100' },
    { name: '短信记录', amount: '1234567' },
    { name: '任务记录', amount: '124' },
    { name: '工单记录', amount: '10' },
    { name: '退款记录', amount: '10' },
    { name: '商机记录', amount: '10' },
    { name: '订单记录', amount: '10' },
    { name: '发票记录', amount: '10' },
    { name: '费用记录', amount: '10' },
    { name: '相关附件', amount: '1032' },
    { name: '归属记录', amount: '10' },
    { name: '操作日志', amount: '110233' },
  ];

  id: string;
  data: LeadDTO;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected service: InfoService,
    private activedRoute: ActivatedRoute
  ) {
    super(logger, fb, service, {});
    this.activedRoute.parent.params.subscribe((p: { id: string }) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.logger.info('info init...', this.id);
    this.getDetail(this.id).subscribe(r => {
      this.data = r.data;
    });
  }

  ngOnDestroy(): void {
    this.logger.info('info destroy...', this.id);
  }
}
