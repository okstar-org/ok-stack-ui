import { Component, OnInit } from '@angular/core';
import { AuthService, MyOrgInfo, User } from '@core/authentication';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class ProfileOverviewComponent implements OnInit {
  org!: MyOrgInfo;
  user!: User;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.orgReq().subscribe(org => {
      console.log('MyOrgInfo:', org);
      this.org = org;
    });

    this.auth.user().subscribe(user => {
      console.log('MyInfo:', user);
      this.user = user;
    });
  }
}
