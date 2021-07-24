import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: string;

  tabLinks = [
    { label: 'info', link: 'info' },
    { label: 'followup', link: 'followup' },
    { label: 'task', link: 'task' },
    { label: 'call', link: 'call' },
    { label: 'attach', link: 'attach' },
  ];

  constructor(private activedRoute: ActivatedRoute) {
    this.activedRoute.params.subscribe((params: { id: string }) => {
      console.log('params=>', params);
      this.id = params.id;
    });
  }

  ngOnInit() {}
}
