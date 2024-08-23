import { OrderResultEntity } from '../../../work/work.api';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrgDept, OrgPost, api } from '../dept.api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeptService } from '../dept.service';
import { deleteEntityTimes } from '@shared/utils/obj';

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.scss'],
})
export class AddDeptComponent {
  form = this.fb.group({
    id: [0],
    orgId: [0, [Validators.required]],
    parentId: [0, [Validators.required]],
    name: ['', [Validators.required]],
    no: [''],
    disabled: [false],
    level: [0],
  });

  constructor(
    private fb: FormBuilder,
    private deptService: DeptService,
    @Inject(MAT_DIALOG_DATA) private origin: OrgDept,
    public dialogRef: MatDialogRef<AddDeptComponent>
  ) {
    if (origin.id) {
      deleteEntityTimes(origin);
      this.form.setValue(origin);
    }
    if (origin.parentId) {
      this.form.get('parentId')?.setValue(origin.parentId);
    }
  }

  onSave() {
    const dept = this.form.value as OrgDept;
    let retval;
    if (dept.id) {
      retval = this.deptService.updateItem(api.save + '/' + dept.id, dept);
    } else {
      retval = this.deptService.saveItem(api.save + '/' + dept.parentId, dept);
    }
    retval.subscribe(r => {
      this.dialogRef.close(r);
    });
  }
}
