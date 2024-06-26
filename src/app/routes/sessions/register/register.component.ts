import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '@core/authentication/auth.service';
import { SignUpForm } from '@core/authentication/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    protected logger: NGXLogger,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      iso: ['CN', [Validators.required]],
      accountType: ['email', [Validators.required]],
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
      agree: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit() {}

  doRegister() {
    if (!this.registerForm.valid) {
      return;
    }

    if (this.isLoading) return;
    this.isLoading = true;

    this.authService
      .register({
        iso: this.registerForm.get('iso')?.value,
        accountType: this.registerForm.get('accountType')?.value,
        account: this.registerForm.get('account')?.value,
        password: this.registerForm.get('password')?.value,
      })
      .subscribe({
        next: data => {
          this.isLoading = false;
          if (data.username) {
            this.router.navigateByUrl('/auth/login');
          }
        },
        error: err => {
          this.isLoading = false;
        },
      });
  }

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };
}
