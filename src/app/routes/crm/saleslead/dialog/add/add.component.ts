import { AddService } from './add.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  addForm: FormGroup;

  constructor(private logger: NGXLogger, private fb: FormBuilder, private addSrv: AddService) {
    this.addForm = fb.group({
      isCreateFollowUpTask: false,
      customerName: '',
      owner: '',
      state: '',
      from: '',
    });
  }

  ngOnInit(): void {}

  get isCreateFollowUpTask() {
    return this.addForm.get('isCreateFollowUpTask');
  }

  doSubmit() {
    this.logger.debug('submit', this.addForm.value);
    this.addSrv.postData(this.addForm.value).subscribe(r => {
      this.logger.debug('==>', r);
    });
  }
}
