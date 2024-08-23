import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '@core/authentication/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
export class ForgotComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    protected logger: NGXLogger,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      iso: ['CN', [Validators.required]],
      accountType: ['email', [Validators.required]],
      account: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  doSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    if (this.isLoading) return;
    this.isLoading = true;
    this.auth.forgot(this.registerForm.value).subscribe({
      next: r => {
        if (r) {
          this.toastr.success('已发送密码重置链接，请登录邮箱完成后续操作！');
          this.router.navigateByUrl('login');
        } else {
          this.toastr.error('系统异常！');
        }
        this.isLoading = false;
      },
      error: e => {
        this.isLoading = false;
      },
    });
  }
}
