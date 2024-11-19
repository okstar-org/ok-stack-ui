import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '@core/authentication/auth.service';
import { SignUpForm } from '@core/authentication/interface';
import { Router } from '@angular/router';

interface EyeIconState {
  password: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  eyeIcon: EyeIconState = {
    password: false,
  };

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
      agree: [false, [Validators.requiredTrue]],
      nickname: [''],
    });
  }

  ngOnInit() {}

  doRegister() {
    if (!this.registerForm.valid) {
      return;
    }

    if (this.isLoading) return;

    this.isLoading = true;

    const data = this.registerForm.value as SignUpForm;

    this.authService.register(data).subscribe({
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

  eyeIconChange(key: keyof EyeIconState) {
    this.eyeIcon[key] = !this.eyeIcon[key];
  }
}
