import { Form } from './../lead.api';
import { MatDialog } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { DetailService } from './detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddComponent } from '../dialog/add/add.component';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: string = '';
  formGroup = new FormGroup({});
  data: any;
  order: string[] = [];

  tabLinks = [
    { label: 'info', link: 'info' },
    { label: 'follow-up', link: 'follow-up' },
    { label: 'task', link: 'task' },
    { label: 'call', link: 'call' },
    { label: 'sms', link: 'sms' },
    { label: 'attach', link: 'attach' },
    { label: 'log', link: 'log' },
  ];

  constructor(
    private logger: NGXLogger,
    private activedRoute: ActivatedRoute,
    private svc: DetailService,

    private fb: FormBuilder
  ) {
    this.activedRoute.params.subscribe(params => {
      console.log('params=>', params);
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.svc.getData(this.id).subscribe(r => {
      this.logger.info(r);
      this.formGroup = this.fb.group(r.data);
      this.data = r.data;
    });
  }
}
