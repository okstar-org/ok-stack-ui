import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '@core/authentication/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      iso: ['CN', [Validators.required]],
      accountType: ['phone', [Validators.required]],
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
        console.log(r);
        if (r) {
          alert('已发送密码重置链接，请登录邮箱完成后续操作！');
        }
      },
      error: err => {
        this.isLoading = false;
      },
    });
  }
}
