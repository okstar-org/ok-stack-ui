import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from './detail.service';
import { SysWorkAppDetail } from '../appmgt/appmgt.api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id = '';
  app!: SysWorkAppDetail;

  constructor(
    private activedRoute: ActivatedRoute,
    private svc: DetailService
  ) {}
  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      console.log('params=>', params);
      this.id = params.id;
      this.init();
    });
  }

  init() {
    console.log(this.id);
    this.svc.getDetail(this.id).subscribe(r => {
      console.log('r=>', r);
      this.app = r;
    });
  }
}
