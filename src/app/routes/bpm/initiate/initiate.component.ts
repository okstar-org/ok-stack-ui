import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiate',
  templateUrl: './initiate.component.html',
  styleUrls: ['./initiate.component.scss'],
})
export class InitiateComponent implements OnInit {
  groups = [
    {
      name: '假勤',
      items: [
        { name: '请假', icon: 'date_range' },
        { name: '出差', icon: 'train' },
        { name: '外出', icon: 'local_taxi' },
        { name: '加班', icon: 'work' },
      ],
    },
    {
      name: '行政',
      items: [
        { name: '会议室预定', icon: 'meeting_room' },
        { name: '物品领用', icon: 'shopping_cart' },
        { name: '物品维修', icon: 'build' },
        { name: '用章', icon: 'offline_pin' },
      ],
    },
    {
      name: '财务',
      items: [
        { name: '报销', icon: 'attach_money' },
        { name: '费用', icon: 'money' },
        { name: '付款', icon: 'payment' },
        { name: '合同审批', icon: 'assignment_turned_in' },
      ],
    },
    {
      name: '人事',
      items: [
        { name: '入职', icon: 'person_add' },
        { name: '转正', icon: 'how_to_reg' },
        { name: '离职', icon: 'person_add_disabled' },
        { name: '绩效', icon: 'bar_chart' },
        { name: '招聘需求', icon: 'assignment_ind' },
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
