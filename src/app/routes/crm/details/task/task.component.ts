import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { NGXLogger } from 'ngx-logger';
import { FollowUpService } from '../follow-up/follow-up.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent extends OkDetailComponent implements OnInit {
  searchControls: any[] = [
    {
      name: 'keyword',
      type: 'input',
      label: '关键词',
    },
    {
      name: 'beginTime',
      type: 'date',
      label: '开始时间',
    },
    {
      name: 'endTime',
      type: 'date',
      label: '截至时间',
    },
  ];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected svc: TaskService
  ) {
    super(logger, fb, svc, {
      keyword: '',
      time: [null],
      beginTime: [null],
      endTime: [null],
    });
  }

  ngOnInit() {
    this.getPage();
  }

  onSearch() {
    this.getPage();
  }

  onClick() {}
}
