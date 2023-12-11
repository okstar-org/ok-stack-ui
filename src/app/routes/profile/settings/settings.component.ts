import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ControlsOf, IProfile } from '@shared';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { ProfileService } from '../profile.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class ProfileSettingsComponent extends OkDetailComponent implements OnInit {
  reactiveForm = this.fb.nonNullable.group({
    id: [0, [Validators.required]],
    // accountId: [0, [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    identify: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    country: [''],
    city: [''],
    address: [''],
    phone: ['', [Validators.required]],
    telephone: [''],
    website: [''],
    birthday: [''],
  });

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected srv: ProfileService
  ) {
    super(logger, fb, srv, {});
  }
  ngOnInit(): void {
    this.getDetail('').subscribe(r => {
      console.log('profile', r);
      delete r.createAt;
      delete r.updateAt;
      delete r.createBy;
      delete r.updateBy;
      delete r.accountId;
      this.reactiveForm.setValue(r);
    });
  }

  getErrorMessage(form: FormGroup<ControlsOf<IProfile>>) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
