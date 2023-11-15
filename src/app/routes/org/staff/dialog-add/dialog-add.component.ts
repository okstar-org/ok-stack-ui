import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gender, OrgStaffFragment, OrgStaffReq } from '../staff.api';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})
export class DialogAddComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    no: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    identity: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    livingIn: [''],
    descr: [''],
  });

  constructor(
    private fb: FormBuilder,
    private svc: StaffService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  onSave() {
    if (!this.form.valid) {
      console.warn('参数校验不通过！');
      return;
    }

    const fragment = this.form.value as OrgStaffFragment;
    const req: OrgStaffReq = { fragment };
    this.svc.save(req).subscribe(r => {
      console.log('save=>', req);
    });
  }
}
