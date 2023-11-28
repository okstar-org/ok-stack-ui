import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  showPassword = false;

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

  get passwordType() {
    return this.showPassword ? 'text' : 'password';
  }

  get passwordToggleLabel() {
    return this.showPassword ? 'Hide password' : 'Reveal password';
  }

  get passwordToggleIcon() {
    return this.showPassword ? 'visibility_off' : 'visibility';
  }

  modelChanged() {
    this.service.updateDetail(this.data).subscribe(r => {
      if (!r) {
        alert('修改失败');
      }
    });
  }
}
