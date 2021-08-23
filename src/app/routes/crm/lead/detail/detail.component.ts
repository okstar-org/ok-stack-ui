import { NGXLogger } from 'ngx-logger';
import { DetailService } from './detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DTO } from '../lead.api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: string;
  data: DTO;

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
    private svc: DetailService
  ) {
    this.activedRoute.params.subscribe((params: { id: string }) => {
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
      this.data = r.data;
    });
  }
}
