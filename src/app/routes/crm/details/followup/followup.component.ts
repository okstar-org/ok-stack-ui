import { FollowupService } from './followup.service';
import { OkPaginatorComponent } from '../../../../shared/components/ok/ok-paginator.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss'],
})
export class FollowupComponent extends OkDetailComponent implements OnInit {
  searchControls = [
    {
      name: 'keyword',
      type: 'input',
      label: '关键词',
    },
    {
      name: 'timeBegin',
      type: 'date',
      label: '开始时间',
    },
    {
      name: 'timeEnd',
      type: 'date',
      label: '截至时间',
    },
  ];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected svc: FollowupService
  ) {
    super(logger, fb, svc, {
      keyword: '',
      time: [null],
      timeBegin: [null],
      timeEnd: [null],
    });
  }

  ngOnInit() {
    this.getPage();
  }

  onClick() {}

  onSearch() {
    this.getPage();
  }
}
