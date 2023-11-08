import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    protected logger: NGXLogger
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  login() {
    this.logger.debug('doLogin...');

    this.auth
      .login(this.username.value, this.password.value, this.rememberMe.value)
      // .pipe(filter(authenticated => authenticated))
      .subscribe({
        complete: () => {
          this.router.navigateByUrl('/dashboard');
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 422) {
            const form = this.loginForm;
            const errors = error.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
        },
      });
  }
}
