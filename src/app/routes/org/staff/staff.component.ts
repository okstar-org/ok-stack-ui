import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  // Nav bar demo
  tabLinks = [
    { label: this.translate.instant('org.staff.tab.pending'), link: 'pending' },
    { label: this.translate.instant('org.staff.tab.employed'), link: 'employed' },
    { label: this.translate.instant('org.staff.tab.left'), link: 'left' },
  ];

  constructor(
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // 导航到子路由
    // this.router.navigateByUrl('/org/staff/pending');
  }

  ngOnInit() {}
}
