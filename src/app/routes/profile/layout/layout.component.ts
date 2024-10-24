import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, MyOrgInfo, User } from '@core/authentication';
import { TranslateService } from '@ngx-translate/core';
import { OkResult } from '@shared/api/ok';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './account.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class ProfileLayoutComponent implements OnInit {
  user!: User;
  org!: MyOrgInfo;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private transalteService: TranslateService,
    private auth: AuthService,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => {
      this.user = user;
    });
    this.auth.orgReq().subscribe(org => {
      this.org = org;
    });
  }

  onNicknameChanged() {
    this.account.updateNickname(this.user.account.nickname).subscribe(r => {
      console.log('=>', r);
      this.toastr.success(this.transalteService.instant('common.success'));
    });
  }

  onFileSelected(event: Event) {
    if (!event.target) {
      return;
    }

    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const file: File = input.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.http.post<OkResult<string>>('/api/sys/upload/avatar', formData).subscribe(r => {
        if (r.success) {
          this.user.account.avatar = r.data;
          this.toastr.success(this.transalteService.instant('common.success'));
        }
      });
    }
  }
}
