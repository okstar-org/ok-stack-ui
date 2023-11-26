import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  // Nav bar demo
  tabLinks = [
    { label: '待入职', link: 'pending' },
    { label: '已入职', link: 'employed' },
    { label: '已离职', link: 'left' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // 导航到子路由
    // this.router.navigateByUrl('/org/staff/pending');
  }

  ngOnInit() {}
}
