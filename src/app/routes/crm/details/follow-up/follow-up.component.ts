import { FollowUpService } from './follow-up.service';
import { OkPaginatorComponent } from '../../../../shared/components/ok/ok-paginator.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss'],
})
export class FollowUpComponent extends OkDetailComponent implements OnInit {
  searchControls: any[] = [
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
    protected svc: FollowUpService
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
