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
    { name: '联系人', amount: '{-}' },
    { name: '消息记录', amount: '{-}' },
    { name: '相关附件', amount: '{-}' },
  ];

  id: string = '';
  data: any;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    protected service: InfoService
  ) {
    super(logger, fb, service, {});
    this.activedRoute.parent?.params.subscribe(p => {
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
