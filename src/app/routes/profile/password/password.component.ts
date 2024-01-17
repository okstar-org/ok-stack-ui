import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, MyOrgInfo, User } from '@core/authentication';
import { NGXLogger } from 'ngx-logger';
import { ProfileService } from '../profile.service';
import { PasswordUpdateForm } from '../profile.api';

@Component({
  selector: 'app-profile-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class ProfilePasswordComponent implements OnInit {
  reactiveForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    private svc: ProfileService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    const form = this.reactiveForm.value as PasswordUpdateForm;
    this.svc.updatePassword(form).subscribe(r => {
      console.log('r=>', r);
    });
  }
}
