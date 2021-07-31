import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {
  meters = [
    { name: '联系人', amount: '10' },
    { name: '跟进记录', amount: '0' },
    { name: '电话记录', amount: '100' },
    { name: '短信记录', amount: '1234567' },
    { name: '任务记录', amount: '124' },
    { name: '工单记录', amount: '10' },
    { name: '退款记录', amount: '10' },
    { name: '商机记录', amount: '10' },
    { name: '订单记录', amount: '10' },
    { name: '发票记录', amount: '10' },
    { name: '费用记录', amount: '10' },
    { name: '相关附件', amount: '1032' },
    { name: '归属记录', amount: '10' },
    { name: '操作日志', amount: '110233' },
  ];

  constructor() {}

  ngOnInit() {
    console.log('info init...');
  }

  ngOnDestroy(): void {
    console.log('info destroy...');
  }
}
