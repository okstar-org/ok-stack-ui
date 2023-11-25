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
    { name: '联系人数量', amount: '-' },
    { name: '消息数量', amount: '-' },
    { name: '群聊数量', amount: '-' },
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
    // this.getGeneralData();
  }

  ngOnDestroy(): void {}

  getGeneralData() {
    this.service.getDetail(this.id).subscribe(r => {
      this.meters[0].amount = r.contacts + '';
      this.meters[1].amount = r.msgs + '';
      this.meters[2].amount = r.groups + '';
    });
  }
}
