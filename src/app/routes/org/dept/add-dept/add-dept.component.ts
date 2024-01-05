import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrgDept, OrgPost, api } from '../dept.api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeptService } from '../dept.service';

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.scss'],
})
export class AddDeptComponent {
  form = this.fb.group({
    id: [0],
    parentId: [0, [Validators.required]],
    no: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private deptService: DeptService,
    @Inject(MAT_DIALOG_DATA) private parent: OrgDept, //
    public dialogRef: MatDialogRef<AddDeptComponent>
  ) {}

  onSave() {
    const dept = this.form.value as OrgDept;
    dept.parentId = this.parent.id;
    this.deptService.saveItem(api.save + '/' + dept.parentId, dept).subscribe(r => {
      this.dialogRef.close(r);
    });
  }
}
