import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conn',
  templateUrl: './conn.component.html',
  styleUrls: ['./conn.component.scss'],
})
export class ConnComponent implements OnInit {
  tabLinks = [
    { label: 'wx', link: 'wx' },
    { label: 'dt', link: 'dt' },
    { label: 'fs', link: 'fs' },
  ];

  constructor() {}

  ngOnInit() {}
}
