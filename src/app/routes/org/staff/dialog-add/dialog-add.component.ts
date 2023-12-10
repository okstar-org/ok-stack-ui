import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gender, OrgStaffFragment, OrgStaffReq, StaffAddOpt, StaffJoinOpt } from '../staff.api';
import { StaffService } from '../staff.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})
export class DialogAddComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    no: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    name: [''],
    identity: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.email]],
    gender: [Gender.NONE],
    descr: [''],
    iso: [''],
    livingIn: [''],
    birthday: [new Date()],
  });

  constructor(
    private fb: FormBuilder,
    private svc: StaffService,
    @Inject(MAT_DIALOG_DATA) private opt: StaffAddOpt
  ) {}

  ngOnInit() {
    if (this.opt) this.form.setValue(this.opt);
  }

  ngOnDestroy() {}

  onSave() {
    if (!this.form.valid) {
      console.warn('参数校验不通过！');
      return;
    }

    const fragment = this.form.value as OrgStaffFragment;
    const req: OrgStaffReq = { fragment, id: this.opt.id };
    this.svc.save(req).subscribe(r => {
      console.log('save=>', req);
    });
  }
}
