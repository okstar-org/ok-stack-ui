import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrgPost } from '../dept.api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeptService } from '../dept.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  form = this.fb.group({
    id: [0],
    deptId: [0, [Validators.required]],
    no: ['', [Validators.required]],
    name: ['', [Validators.required]],
    descr: [''],
    uuid: [''],
    recruit: [''],
    disabled: [false],
  });

  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    private fb: FormBuilder,
    private deptService: DeptService,
    @Inject(MAT_DIALOG_DATA) private origin: OrgPost //
  ) {
    this.form.setValue(origin);
  }

  onSave() {
    const post = this.form.value as OrgPost;
    this.deptService.savePost(post).subscribe(r => {
      if (r) {
        this.dialogRef.close();
      }
    });
  }
}
