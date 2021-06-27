import { DTO } from './../../saleslead.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddService } from './add.service';
import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  addForm: FormGroup;

  emitter = new EventEmitter<void>();

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private addSrv: AddService,
    @Inject(MAT_DIALOG_DATA) public data: DTO
  ) {
    this.logger.debug('data:', data);
    this.addForm = fb.group(data);
  }

  ngOnInit(): void {}

  get isCreateFollowUpTask() {
    return this.addForm.get('isCreateFollowUpTask');
  }

  doSubmit() {
    this.logger.debug('submit', this.addForm.value);
    this.addSrv.postData(this.addForm.value).subscribe(r => {
      this.logger.debug('==>', r);
      this.emitter.emit();
    });
  }
}
