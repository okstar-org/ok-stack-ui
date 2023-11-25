import { DetailService } from './detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatRoom } from '../room.api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: string = '';
  data!: ChatRoom;
  general: any;

  tabLinks = [
    { label: 'info', link: 'info' },
    { label: 'contact', link: 'contact' },
  ];

  constructor(
    private activedRoute: ActivatedRoute,
    private svc: DetailService
  ) {
    this.activedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.svc.getData(this.id).subscribe(r => {
      this.data = r;
    });
  }
}
