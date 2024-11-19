import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { api, OrgStaffEdit, OrgStaffProfile, staffForm } from '../staff.api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],
})
export class DialogEditComponent {
  form = this.fb.group(staffForm);
  constructor(
    private fb: FormBuilder,
    private srv: StaffService,
    @Inject(MAT_DIALOG_DATA) private origin: OrgStaffEdit,
    public dialogRef: MatDialogRef<DialogEditComponent>
  ) {
    this.form.setValue(origin);
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onSubmit() {
    console.log('onSubmit...');
    if (this.form.invalid) {
      console.warn('invalid.');
      return;
    }
    const data = this.form.value as OrgStaffProfile;
    this.srv.updateItem(api.save + '/' + data.accountId, data).subscribe(r => {
      console.log('=>', r);
      this.dialogRef.close(r);
    });
  }
}
