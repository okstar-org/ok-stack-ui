import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ControlsOf, IProfile } from '@shared';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { ProfileService } from '../profile.service';
import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class ProfileSettingsComponent extends OkDetailComponent implements OnInit {
  reactiveForm = this.fb.nonNullable.group({
    id: [0, [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    identify: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    phone: [''],
    country: [''],
    city: [''],
    address: [''],
    telephone: [''],
    website: [''],
    birthday: [''],
    uuid: [''],
    language: [''],
  });

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    private toastr: ToastrService,
    private transalteService: TranslateService,
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

  onSubmit() {
    const profile = this.reactiveForm.value as IProfile;
    this.srv.updateDetail(profile).subscribe(r => {
      console.log('r=>', r);
      if (r) this.toastr.success(this.transalteService.instant('common.success'));
    });
  }
}
