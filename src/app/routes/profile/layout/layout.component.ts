import { Component, OnInit } from '@angular/core';
import { AuthService, MyOrgInfo, User } from '@core/authentication';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class ProfileLayoutComponent implements OnInit {
  user!: User;
  org!: MyOrgInfo;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => {
      this.user = user;
    });
    this.auth.orgReq().subscribe(org => {
      this.org = org;
    });
  }
}
