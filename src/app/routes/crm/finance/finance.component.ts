import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {
  tabLinks = [
    { label: 'collection-plan', link: 'collection-plan' },
    { label: 'collection-manage', link: 'collection-manage' },
    { label: 'refund', link: 'refund' },
    { label: 'invoice', link: 'invoice' },
    { label: 'cost', link: 'cost' },
  ];

  constructor() {}

  ngOnInit() {}
}
