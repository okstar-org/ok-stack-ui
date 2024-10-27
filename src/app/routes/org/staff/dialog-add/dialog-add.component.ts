import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrgStaffProfile, StaffAddOpt, staffForm } from '../staff.api';
import { StaffService } from '../staff.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})
export class DialogAddComponent implements OnInit, OnDestroy {
  form = this.fb.group(staffForm);

  constructor(
    private fb: FormBuilder,
    private svc: StaffService,
    @Inject(MAT_DIALOG_DATA) private opt: StaffAddOpt,
    public dialogRef: MatDialogRef<DialogAddComponent>
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

    const profile = this.form.value as OrgStaffProfile;
    const req = { profile, id: this.opt.id };
    this.svc.save(req).subscribe(r => {
      this.dialogRef.close(r);
    });
  }
}
