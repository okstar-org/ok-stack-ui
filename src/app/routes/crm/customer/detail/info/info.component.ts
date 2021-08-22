import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { NGXLogger } from 'ngx-logger';
import { InfoService } from './info.service';

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
  data: any;
  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    protected service: InfoService
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
