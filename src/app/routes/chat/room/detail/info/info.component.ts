import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { NGXLogger } from 'ngx-logger';
import { InfoService } from './info.service';
import { ChatRoom } from '../../room.api';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {
  id: string = '';
  data!: ChatRoom;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    protected service: InfoService
  ) {
    this.activedRoute.parent?.params.subscribe(p => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getGeneralData();
  }

  ngOnDestroy(): void {}

  getGeneralData() {
    this.service.getDetail(this.id).subscribe(r => {
      this.data = r;
    });
  }
}
