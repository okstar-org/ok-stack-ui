import { FollowupService } from './followup.service';
import { OkPaginatorComponent } from './../../../../../shared/components/ok/ok-paginator.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss'],
})
export class FollowupComponent extends OkDetailComponent implements OnInit {
  length = 100;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: FollowupService
  ) {
    super(logger, fb, svc, {});
  }

  ngOnInit() {
    this.getPage();
  }

  onClick() {}

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
